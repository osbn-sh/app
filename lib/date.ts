export const PersianData = (date: string): string => {
    const t= new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));



    console.log(t)


    return t
}


export const AgoDateCalculator = (date: string): string => {
  const now = new Date().getTime();
  const target = new Date(date).getTime();

  const diff = Math.max(0, now - target);

  const second = Math.floor(diff / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);

  if (second < 1) return "همین الان";
  if (second < 60) return `${second} ثانیه پیش`;
  if (minute < 60) return `${minute} دقیقه پیش`;
  if (hour < 24) return `${hour} ساعت پیش`;
  if (day < 7) return `${day} روز پیش`;

  return `${week} هفته پیش`;
};