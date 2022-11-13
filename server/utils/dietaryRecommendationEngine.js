const Meal = require('../models/Meal');
const scoreCalculator = require('./scoreCalculator');

/**
 * Calcules a user's wellness score. A wellness score is an arbitrary
 * ranking system that accounts for:
 *      
 *      - BMI
 *      - number/intensity of workouts per week (must have at least 3 workouts logged)
 *      - average calorie/fat/protein/carb intake (must have at least 3 meals logged)
 *      - sleeping patterns (must have at least 3 sleeps logged)
 * 
 * Wellness scores have a minimum of 0 and a maximum 
 * of 100. In practice no one is likely to recieve the minimum score
 * of 0, but it is possible to achieve a score of 100. The score will
 * be calculated as follows ('(' or ')' mean exclusive,
 * '[' or ']' mean inclusive):
 *      
 *      - 30 points: BMI
 *          = Points will be assigned for BMI as follows:
 *              +  (0, 16) = 0 pts
 *              +  [17, 18) = 5 pts
 *              +  [18, 19) = 15 pts
 *              +  [19, 20) = 20 pts
 *              +  [20, 25] = 30 pts
 *              +  (25, 27) = 20 pts
 *              +  [27, 29) = 15 pts
 *              +  [29, 31) = 5 pts
 *              +  [31, INF) = 0 pts
 * 
 *      - 20 points: number/intensity of workouts per week
 *          = We will give the user pionts gradually for the amount and intensity of workouts
 *              they've logged in the past 7 days.
 *              + 5 points per high intensity workout
 *              + 4 points per medium intensity workout
 *              + 2 points per low intensity workout
 * 
 *      - 25 points: average calorie/fat/protein/carb intake
 *          = 7 points will be assigned for average calorie intake.
 *              Average calorie intake will be compared to a user's
 *              calculated calorie needs (calculated using the
 *              Harris-Benedict Formula described here: 
 *              https://www.omnicalculator.com/health/bmr-harris-benedict-equation). 
 *              Points will be given as follows:
 *                  7 - floor(abs('calculated calories' - avg. calories) / 50)
 * 
 *          = 7 points will be assigned for average protein intake.
 *              Average protein intake will be compared to a user's
 *              calculated protein needs (calculated by: weight * 0.3636). 
 *              Points will be given as follows:
 *                  7 - (avg. protein < 'calculated protein' ? floor(abs('calculated protein' - avg. protein) / 2) : 0)
 * 
 *          = 6 points will be assigned for average carb intake.
 *              Average carb intake will be compared to a user's
 *              calculated carb needs. Carb intake needs will be calculated by: 
 *                  calulated calories * .5 / 4 (calories/gram)
 * 
 *              Points will be given as follows:
 *                  6 - floor(abs('calculated carbs' - avg. carbs) / 3)
 * 
 *          = 5 points will be assigned for average fat intake.
 *              Average fat intake will be compared to a user's
 *              calculated fat needs. Fat intake needs will be calculated by: 
 *                  calulated calories * .2 / 9 (calories/gram)
 * 
 *              Points will be given as follows:
 *                  5 - floor(abs('calculated fat' - avg. fat) / 3)
 * 
 *      - 25 points: sleeping patterns
 *          = We will assume that adults should get an average of 8.0 hours (480 mins) of
 *            sleep per night and users average sleep is in the. Points will be awarded in 
 *            a simple fashion:
 *              25 - (avg. sleep mins < 480 ? (abs(480 - avg. sleep mins) / 10) * 2 : 0)
 * 
 * @param {User} user A User object from MongoDB Cloud.
 * @return {int} A number between 0 and 100 arbitrarily rating a user's fitness.
 */
const provideRecommendations = async (userProfile) => {
    var bmiRecommendation = '';
    var calorieRecommendation = '';
    var proteinRecommendation = '';
    var fatRecommendation = '';
    var carbsRecommendation = '';

    const email = userProfile.email;
    
    // Give points for BMI
    const bmi = scoreCalculator.calculateBmi(heightMeters, weightKg);
    if (bmi < 20)
        bmiRecommendation = 'You are underweight and could use additional calories.';
    else if (25 < bmi && bmi < 30)
        bmiRecommendation = 'You are overweight!';
    else if (30 <= bmi)
        bmiRecommendation = 'You are obese and need to take serious precautions regarding your health!';


    
    // Find the user's meals
    let meals = await Meal.find({ email: email }).exec();
    // Check if the user has meals
    if (!meals) {
        let err = `Could not find any meals for ${email}!`;
        res.status(401).json(err);
        return;
    }
    if (!meals) 
        return -1;
    else if (meals.length < 3)
        return -1;

    let avgCalories = meals.reduce((totalCalories, meal) => totalCalories + meal.calories, 0) / meals.length;
    let avgProtein = meals.reduce((totalProtein, meal) => totalProtein + meal.protein, 0) / meals.length;
    let avgCarbs = meals.reduce((totalCarbs, meal) => totalCarbs + meal.carbs, 0) / meals.length;
    let avgFat = meals.reduce((totalFat, meal) => totalFat + meal.fat, 0) / meals.length;

    // The user's resting calorie needs
    let basalMetabolicRate = 66.5 + (13.75 * weightKg) + (5.003 * heightMeters * 100) - (6.75 * userProfile.age);
    let userActityLevel = userProfile.weightGoal === 'Loose' ? 1.4 : userProfile.weightGoal === 'Gain' ? 1.65 : 1.5;
    let caloriesNeeded = basalMetabolicRate * userActityLevel;
    let proteinNeededGrams = userProfile.weight * 0.3636;
    let carbsNeededGrams = caloriesNeeded * .5 / 4;
    let fatNeededGrams = caloriesNeeded * .2 / 9;
    
    let calorieDifference = Math.abs(caloriesNeeded - avgCalories);
    let proteinDifference = Math.abs(proteinNeededGrams - avgProtein);
    let carbDifference =    Math.abs(carbsNeededGrams - avgCarbs);
    let fatDifference =     Math.abs(fatNeededGrams - avgFat);

    if (calorieDifference >= 100)
        calorieRecommendation = `Your average calorie intake is ${avgCalories} cal/day, when you
        should intake close to ${caloriesNeeded}!`
    if (proteinDifference >= 100)
        proteinRecommendation = `Your average protein intake is ${avgProtein} cal/day, when you
        should intake close to ${proteinNeededGrams}!`
    if (carbDifference >= 100)
        carbsRecommendation = `Your average carbohydrate intake is ${avgCarbs} cal/day, when you
        should intake close to ${carbsNeededGrams}!`
    if (fatDifference >= 100)
        fatRecommendation = `Your average fat intake is ${avgFat} cal/day, when you
        should intake close to ${fatNeededGrams}!`
    
    return {
        bmiRecommendation: bmiRecommendation,
        calorieRecommendation: calorieRecommendation,
        proteinRecommendation: proteinRecommendation,
        fatRecommendation: fatRecommendation,
        carbsRecommendation: carbsRecommendation
    };
}

module.exports.provideRecommendations = provideRecommendations;