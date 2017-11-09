/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Services - Answers
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/*************************/
/***** PARSE ANSWERS *****/
/*************************/

/*
 * @var String ansers
 * @return Array
 */

exports.parseAnswers = (answers) => {
    const parsed = answers
      .split(/\n/g)
      .reduce((acc, answer) => {
        if (acc.indexOf(answer) === -1) { 
          acc.push(answer) 
        } 
        return acc
      },[])
      .map((data) => {
        return {
          answer: data.replace(/\r/, ''), 
          votes: 0
        }
      })
  return parsed
}