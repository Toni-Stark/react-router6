export const queryToObj = (url: string): Object => {
  let res: any = {};
  const search = url.substring(1); //去掉前面的“?”
  search.split("&").forEach((paramStr) => {
    const arr = paramStr.split("=");
    const val = arr[1];
    const key = arr[0];
    res[key] = val;
  });
  return res;
};
