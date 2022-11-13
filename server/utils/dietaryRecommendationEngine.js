const Meal = require('../models/Meal');
const scoreCalculator = require('./scoreCalculator');

/**
 * Provided dietary recommendations to a user based on their BMI and 
 * average calorie/fat/protein/carb intake.
 * 
 * @param {UserProfile} userProfile A UserProfile object from MongoDB Cloud.
 * @return {Object} A JSON obj with the following pattern:
 *  {
 *      bmiRecommendation: '...', // Some bmi recommendation
 *      calorieRecommendation: '...', // Some calorie intake recommendation
 *      proteinRecommendation: '', // No recommendation
 *      fatRecommendation: '',  // No recommendation
 *      carbsRecommendation: '',  // No recommendation
 *  }
 */
const provideRecommendations = async (userProfile) => {
    var bmiRecommendation = '';
    var calorieRecommendation = '';
    var proteinRecommendation = '';
    var fatRecommendation = '';
    var carbsRecommendation = '';

    const email = userProfile.email;
    
    
    const heightMeters = (userProfile.heightFeet * 12 + userProfile.heightInches) * 0.0254; // 1 ft = 0.0254 m
    const weightKg = userProfile.weight * 0.453592; // 1 lb = 0.453592 kg
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
        calorieRecommendation = `Your average calorie intake is ${avgCalories.toFixed(2)} cal/day, when you should intake close to ${caloriesNeeded.toFixed(2)}!`
    if (proteinDifference >= 100)
        proteinRecommendation = `Your average protein intake is ${avgProtein.toFixed(2)} cal/day, when you should intake close to ${proteinNeededGrams.toFixed(2)}!`
    if (carbDifference >= 100)
        carbsRecommendation = `Your average carbohydrate intake is ${avgCarbs.toFixed(2)} cal/day, when you should intake close to ${carbsNeededGrams.toFixed(2)}!`
    if (fatDifference >= 100)
        fatRecommendation = `Your average fat intake is ${avgFat.toFixed(2)} cal/day, when you should intake close to ${fatNeededGrams.toFixed(2)}!`
    
    return {
        bmiRecommendation: bmiRecommendation,
        calorieRecommendation: calorieRecommendation,
        proteinRecommendation: proteinRecommendation,
        fatRecommendation: fatRecommendation,
        carbsRecommendation: carbsRecommendation
    };
}

module.exports.provideRecommendations = provideRecommendations;