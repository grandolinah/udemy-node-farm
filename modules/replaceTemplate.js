module.exports  = (originalHtml, data) => {
  let output = originalHtml.replace(/{%PRODUCTNAME%}/g, data.productName);
  output = output.replace(/{%ICON%}/g, data.image);
  output = output.replace(/{%PRICE%}/g, data.price);
  output = output.replace(/{%FROM%}/g, data.from);
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  output = output.replace(/{%ORGANIC%}/g, data.organic);
  output = output.replace(/{%DESCRIPTION%}/g, data.description);
  output = output.replace(/{%ID%}/g, data.id);
  output = output.replace(/{%ISORGANIC%}/g, data.organic ? 'Organic!' : 'Not organic!');
  output = output.replace(/{%NOT_ORGANIC%}/g, data.organic ? '' : 'not-organic');

  return output;
};
