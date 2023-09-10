import { YoutubeTranscript } from "youtube-transcript";

const transcript = await YoutubeTranscript.fetchTranscript("mmkDyV59nRo");

const combinedText = transcript.reduce(
  (combinedText, current) => combinedText + " " + current.text,
  ""
);

const splitTranscript = (
  transcriptText: string,
  chunkSize: number,
  overlapPercentage: number
) => {
  const chunks = [];
  const overlapCharacterLength = chunkSize * (overlapPercentage / 100);
  let startIndex = 0;
  let endIndex = Math.min(chunkSize, transcriptText.length - startIndex);
  while (endIndex < transcriptText.length) {
    const chunk = transcriptText.slice(startIndex, endIndex);
    chunks.push(chunk);
    startIndex = endIndex - overlapCharacterLength;
    endIndex = Math.min(startIndex + chunkSize, transcriptText.length);
  }
  return chunks;
};

console.log(combinedText);
console.log(splitTranscript(combinedText, 3000, 10));
