exports.sendResponse =  function sendResponse(res, status, msg) {
  res.status(200).send({
    status: status,
    message: msg
  });
}

exports.sendResponseData =  function sendResponseData(res, data, status, msg) {
  res.status(200).send({
    data: data,
    status: status,
    message: msg
  });
}

exports.sendSuccessfullyTokenResponse =  function sendSuccessfullyTokenResponse(res, data, token, status, msg) {
  res.status(200).send({
    data: data,
    token: token,
    status: status,
    message: msg
  });
}


exports.sendResponseDataHome =  function sendSuccessfullyTokenResponse(res, banner, category, status, msg) {
  res.status(200).send({
    banner: banner,
    category: category,
    status: status,
    message: msg
  });
}

exports.sendResponseEventLegal =  function sendResponseEventLegal(res, current, upcoming, status, msg){
  res.status(200).send({
    data: current,
    upcoming: upcoming,
    status: status,
    message: msg
  });
}