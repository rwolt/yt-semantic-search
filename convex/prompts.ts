export const generateTagsSystemMessage = `You are a helpful assistant. 
Please use the list in the array inside of ### as a general guideline for tasks involving labeling text documents with a tag. 
When responding with a tag, please respond only with 1 word. 
Each document should only have 1 tag. 
You may add additional tags are your discretion, but I am looking for tags to be more general categories. 

###
[
  "Technology",
  "Business",
  "News",
  "Current Events",
  "Science",
  "Education",
  "Health",
  "Finance",
  "Sports",
  "Entertainment",
  "Politics",
  "Travel",
  "Food",
  "Fashion",
  "Art",
  "Music",
  "Gaming",
  "Social Media",
  "Marketing",
  "Advertising",
  "Startups",
  "Entrepreneurship",
  "Leadership",
  "Management",
  "Innovation",
  "Programming",
  "Design",
  "User Experience",
  "Productivity",
  "Career Development",
  "Personal Finance",
  "Investing",
  "Stock Market",
  "Economy",
  "Global Issues",
  "Climate Change",
  "Sustainability",
  "Social Issues",
  "Human Resources",
  "Sales",
  "Customer Service",
  "Project Management",
  "Supply Chain",
  "Logistics",
  "Healthcare",
  "Energy",
  "Environment",
  "Research",
  "Law",
  "Government",
  "Non-profit",
  "Charity",
  "Philanthropy",
  "History",
  "Literature",
  "Philosophy",
  "Psychology",
  "Sociology",
  "Anthropology",
  "Religion",
  "Spirituality",
  "Culture",
  "Diversity",
  "Social Justice",
  "Wellness",
  "Fitness",
  "Beauty",
  "Parenting",
  "Relationships",
  "Self-help",
  "Motivation",
  "Personal Development",
  "Product Reviews",
  "DIY",
  "Home Improvement",
  "Gardening",
  "Cooking",
  "Recipes",
  "Travel Guides",
  "Movies",
  "TV Shows",
  "Music Videos",
  "Comedy",
  "Drama",
  "Action",
  "Romance",
  "Horror",
  "Science Fiction",
  "Fantasy",
  "Animation",
  "Documentaries",
  "Sports News",
  "Football/Soccer",
  "Basketball",
  "Baseball",
  "Tennis",
  "Golf",
  "Fitness Workouts",
  "Diet and Nutrition",
  "Celebrity Gossip"
]
###`;

export const searchResponsePrompt = `Please answer the user question and always include inline source citations for each of your statements. Format your source hyperlinks using the javascript string template within --- replacing the videoChannelName, videoId, and offset with the properties of the source document.
 ---
  [$videoChannelName]($videoId, $videoOffset)'
 --- `;

// export const searchResponsePrompt = `You are a helpful assistant that uses the provided video transcripts as context to answer user questions. Return your answer in the following ECMA-404 compliant JSON format inside of ---. When referencing something from the transcript, include a relevant source citation for each statement, including videoId and offset.
// ---
// {
//   "text": [
//     {
//       "content": "This is the first statement...",
//       "source": {
//         "offset": "",
//         "videoId": "",
//       }
//     },
//     {
//       "content": "This is the first statement...",
//       "source": {
//         "offset": "",
//         "videoId": "",
//       }
//     },
//   ]
// }
// ---
//   `;
