## Friend Finder APP

URL: 

![APP Sreenshot](https://github.com/GospelBeats/friend-finder/blob/master/app-ss.JPG)


###### Technologies

Node and Express Servers


###### APP Description

The "FriendFinder" application is basically similar to a dating app. This full-stack application will take in results from your users' surveys, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match. 


###### File Structure

```
  FriendFinder
    - .gitignore
    - app
      - data
        - friends.js
      - public
        - home.html
        - survey.html
      - routing
        - apiRoutes.js
        - htmlRoutes.js
    - node_modules
    - package.json
    - server.js
  ```

###### Technical Details

1. The survey have 10 questions with a scale of 1 to 5 based on how much the user agrees or disagrees with a question.

2. The `server.js` file requires npm packages: `express` and `path`.

3. The `htmlRoutes.js` includes two routes:

   * A GET Route to `/survey` that displays the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page.

4. The `apiRoutes.js` contains two routes:

   * A GET route with the url `/api/friends` that displays JSON of all possible friends.
   * A POST routes `/api/friends` that is used to handle incoming survey results and the compatibility logic.

5. The application's data is saved inside `app/data/friends.js` as an array of objects that follows the format below.

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

6. Determined the user's most compatible friend using the following guide:

   * Converted each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * Compared the difference between current user's scores against those from other users, question by question, then adding up the differences to calculate the `totalDifference`.
     * Example:
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * Used the absolute value of the differences with no negative solutions. 
   * The closest match is the user with the least amount of difference.

7. Once you've found the most compatible friend, a modal display pop-up displaying both the name and picture of the closest match.