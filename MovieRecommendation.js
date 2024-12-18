const movies={
    1:{title:"Pushpa-2",genre:"Sci-Fi",year:2024},
    2:{title: "Titanic", genre: "Romance", year: 1997},
    3:{title: "Jagar", genre: "Action", year: 2024},
    5:{title: "Avengers: Endgame", genre: "Action", year: 2019 }
};
const userRatings = {
    user1: { 1: 5, 2: 4, 3: 3 },
    user2: { 1: 4, 2: 5, 5: 5 },
    user3: { 1: 3, 3: 4, 5: 5 }
};
function calculateSimilarity(ratingsA,ratingsB){
    let commonMovies=Object.keys(ratingsA).filter(movie=> movie in ratingsB);
    if (commonMovies.length === 0) return 0;
    let sumA=0;
    let sumB=0;
    let sumASq=0;
    let sumBSq=0;
    let sumProduct=0;
    commonMovies.forEach(movie => {
        const ratingA = ratingsA[movie];
        const ratingB = ratingsB[movie];
    
        sumA += ratingA;
        sumB += ratingB;
        sumASq += ratingA ** 2;
        sumBSq += ratingB ** 2;
        sumProduct += ratingA * ratingB;
      });
    const n=commonMovies.length;
    const numerator=sumProduct-(sumA*sumB)/n;
    const denominator=Math.sqrt((sumASq-(sumA**2)/n)*(sumBSq - (sumB ** 2) / n));
    return denominator===0?0:numerator/denominator;
}
function recommendMovies(targetUser,userRatings,movies,topN=3){
    const similarities={};
    for(const user in userRatings){
        if(user !== targetUser){
            similarities[user]= calculateSimilarity(userRatings[targetUser],userRatings[user]);
        }
    }
    const similarUsers=Object.entries(similarities)
        .sort(([,simA],[,simB])=>simB-simA)
        .map(([user])=>user);
    
    const recommendedMovies={};
    similarUsers.forEach(user => {
        const theirRatings = userRatings[user];
    
        for (const movie in theirRatings) {
          if (!(movie in userRatings[targetUser])) {
            if (!recommendedMovies[movie]) {
              recommendedMovies[movie] = { score: 0, count: 0 };
            }
    
            recommendedMovies[movie].score += theirRatings[movie] * similarities[user];
            recommendedMovies[movie].count++;
          }
        }
      });
      const sortedRecommendations = Object.entries(recommendedMovies)
      .map(([movie, data]) => ({
        movie: parseInt(movie),
        score: data.score / data.count
      }))
      .filter(rec=>movies[rec.movie])
      .sort((a,b)=>b.score-a.score)
      .slice(0,topN)
      .map(rec=>movies[rec.movie].title);
    return sortedRecommendations;
}
const recommendations = recommendMovies("user1", userRatings, movies);
console.log("Recommended Movies:", recommendations);