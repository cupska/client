const marginUntung = 0.3;
const IMAGE_LIMIT_MB = 3;
const IMAGE_LIMIT = IMAGE_LIMIT_MB * 1024 * 1024;
const REQUIRED_MSG = "Harap isi kolom diatas";
const ERR_REQ_NUMBER = "Harap isi dengan angka yang valid";
const IMG_RESTRICTION_TYPE = ["image/jpeg", "image/png", "image/jpg"];

export {
  REQUIRED_MSG,
  IMG_RESTRICTION_TYPE,
  ERR_REQ_NUMBER,
  marginUntung,
  IMAGE_LIMIT,
  IMAGE_LIMIT_MB,
};
