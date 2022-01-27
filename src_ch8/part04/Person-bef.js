import { subtractDate } from "./Date.js";

function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);

  renderPhoto(outStream, person.photo);
  emitPhotoData(outStream, person.photo);
}

function renderPhoto(outStream, aPhoto) {
  outStream.write(`${aPhoto.content}`);
}
function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDateCutoff())
    .forEach((p) => {
      outStream.write("<div>\n");
      emitPhotoData(outStream, p);
      outStream.write("</div>\n");
    });
}
function recentDateCutoff() {
  return subtractDate(new Date(), 5);
}
function emitPhotoData(outStream, photo) {
  outStream.write(`<p>제목: ${photo.title}</p>\n`);
  outStream.write(`<p>날짜: ${photo.date.toDateString()}</p>\n`);
  outStream.write(`<p>위치: ${photo.location}</p>\n`);
}

export { renderPerson, listRecentPhotos, emitPhotoData };
