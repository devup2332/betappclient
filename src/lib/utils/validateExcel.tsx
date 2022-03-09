export const validateExcel = (file: File) => {
  if (
    file.type !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return false;
  return true;
};
