# flask_angular6
Single page application with flask, Angular6.0
(1) flask provide json data with REST-API
(2) angularJS take the json data and draw chart 
    (2-1) code, test Angular6 app when both (1) & (2) run seperat. be careful, need CORS
(3) build Angular6.0 app. by "ng build"
(4) copy dist/* to flask project's static/<name>/
(5) python flask_main.py