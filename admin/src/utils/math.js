let { create, all } =require("mathjs");
let mathjs = create(all);
mathjs.config({ number: "BigNumber"  });

module.exports = {
  mathjs
};
