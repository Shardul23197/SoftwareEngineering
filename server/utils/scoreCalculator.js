


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
 *      - 25 points: average calorie/fat/protein/carb intake
 *          = 7 points will be assigned for average calorie intake.
 *              Average calorie intake will be compared to a user's
 *              calculated calorie needs (calculated using the
 *              Harris-Benedict Formula). Points will be given as
 *              follows:
 *                  10 - floor(abs('calculated calories' - avg. calories) / 50)
 * 
 *          = 7 points will be assigned for average protein intake.
 *              Average protein intake will be compared to a user's
 *              calculated protein needs (calculated by: weight * 0.3636). 
 *              Points will be given as follows:
 *                  10 - (avg. protein < 'calculated protein' ? floor(abs('calculated protein' - avg. protein) / 2) : 0)
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
 *      - 20 points: number/intensity of workouts per week
 *          = 
 * 
 * @param {User} user A User object from MongoDB Cloud.
 * 
 */
const calculateWellnessScore = (user) => {
    
}

/**
 * Calcules a person's BMI.
 * 
 * @param {double} height Height of the person in inches
 * @param {double} weight Weight of the person in pounds
 * @return {double} The BMI of the person where the range of 
 * values is as follows:
 *        
 *        - Underweight = (0, 18.5]
 *        - Normal weight = [18.5, 25)
 *        - Overweight = [25 – 30)
 *        - Obesity = [30, INF)
 */
const calculateBmi = (height, weight) => {
    const heightMeters = height * 0.0254; // 1 ft = 0.0254 m
    const weightKg = weight * 0.453592; // 1 lb = 0.453592 kg
    return weightKg / Math.pow(heightMeters, 2);
}

module.exports.calculateWellnessScore = calculateWellnessScore;