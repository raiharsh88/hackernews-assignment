
// newsFeed contains utility functions for ArticleScreen  


  const loadCount = 4; //This variable controlls how many stories are added at a time in laze loading



const loadMore = async function (
  content,
  setContent,    
  stories,
  setStories,
  loading,
  setLoading,
  controller,
) {
 
  let temp = content.stories;

  let remaining = content.count - content.current; //No of stories yet to be loaded

  if (remaining < 1) {
    setLoading(null);
    return;
  }

  remaining = Math.min(loadCount, remaining); //Min No of stories yet to be loaded and loadCount

  await Promise.all(
    stories
      .slice(content.current + 1, content.current + remaining)//Taking next 4 or all remaining stories and loading
      .map(async id => {
        let request = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,

          {signal: controller.signal},
        )
          .then(r => r)
          .catch(err => {
            throw err;
          });

        if (request.status === 200) {
          let response = await request.json();
          temp.push(response);
        }
      }),
  );

  setContent({       //Seetting the content with newly loaded stories added to it
    count: content.count,
    stories: temp,
    current: content.current + remaining,
  });

  setLoading(null);
};

export {loadMore};
