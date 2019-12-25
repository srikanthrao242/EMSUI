export function getBase64FromImageUrl(url) {
  var img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  img.onload = function () {
      var canvas = document.createElement("canvas");
      var dataURL = canvas.toDataURL("image/png");

  };

  img.src = url;
}

export function addDays(ds: string, days: number) : string {
  const d = new Date(ds);
  return new Date(d.setDate(d.getDate() + days)).toISOString().replace("T", " ").replace("Z","");
}

export function addDaysFromDate(d: Date, days: number) : string {
  return new Date(d.setDate(d.getDate() + days)).toISOString().replace("T", " ").replace("Z","");
}

export default addDaysFromDate
