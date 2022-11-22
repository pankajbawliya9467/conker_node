"use strict";
const express = require('express');

exports.notification = function(msg,player){    
    console.log(player);
      var AppID='ebfd2581-0d69-4e5d-a550-8ff414844248';
      // var channelID = 'c130aacb-7e9a-4e36-bf88-510130ace867';
      var authorization='Basic Y2MyMjVmODktNWM2MC00NDgzLWFjNDctYmI1Zjc3ODUzZTgx';
    var sendNotification = function(data) {

        var headers = {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": authorization
        };
        
        var options = {
          host: "onesignal.com",
          port: 443,
          path: "/api/v1/notifications",
          method: "POST",
          headers: headers
        };
        
        var https = require('https');

        var req = https.request(options, function(res) {  

          res.on('data', function(data) {  
            console.log("Response:");
            console.log(JSON.parse(data));
          });

        });
        
        req.on('error', function(e) {
          console.log("ERROR:");
          console.log(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
    };
      
      var message = { 
          app_id: AppID,
          contents: {"en": msg},
          headings: {"en": "Justitiaa"},
          subtitle: {"en": "Justitiaa"},
          data: {"foo" : "bar"},
          include_player_ids: player
      };

        
    sendNotification(message);
}



