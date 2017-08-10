const express = require('express');
const router = express.Router();

const demo_insert = require('./../models/demo_insert');
const demo_insert2 = require('./../models/demo_insert_asyncawait');

const data = require('../../data.json');
var data_json = {
  'lang': 'th',
  'id': 'DKB6ObgzPzy',
  'actor': null,
  'album_name': null,
  'article_category': null,
  'audio': null,
  'away_score': null,
  'away_team_id': null,
  'away_team_name': null,
  'business_models': '',
  'channel_code': null,
  'clip_type': null,
  'content_type': 'movie',
  'count_views': null,
  'country': null,
  'create_date':  new Date(),
  'detail': 'นัดที่ 30 :สำหรับรับชมโปรแกรมการแข่งขันระหว่างวันที่   24 - 25 ตค. 58  ชมสดยามาฮ่า ลีก วัน สูงสุด 5 คู่ต่อสัปดาห์ ได้ทุกที่ ทุกเวลา พร้อมดูย้อนหลังได้อย่างจุใจ แฟนบอลไทยไม่ควรพลาดความมันส์แบบไม่ยั้ง',
  'digital_no': null,
  'director': null,
  'drm_flag': null,
  'duration': null,
  'enable_date': null,
  'ep_items': null,
  'expire_date':  new Date(),
  'genre': null,
  'home_score': null,
  'home_team_id': null,
  'home_team_name': null,
  'keyword': null,
  'lat': null,
  'league_code': null,
  'license': null,
  'lng': null,
  'lyric_address': null,
  'match_date': null,
  'movie_type': null,
  'music_label': null,
  'original_id': 'TVP201510000026',
  'package_code': 'YAMAHA_LEAGUE_ONE_2015_MD30',
  'premium_flag': null,
  'province': null,
  'provisions': null,
  'publish_date':  new Date(),
  'rate': null,
  'regional': null,
  'release_year': null,
  'schedule_code': null,
  'screenshots': null,
  'season_id': null,
  'season_name': null,
  'shelf_content_type': null,
  'shelf_items': null,
  'singer_name': null,
  'source': null,
  'source_url': null,
  'status': 'publish',
  'stream_info': { episode_id: '1625118', program_id: 'TVP201510000026' },
  'stream_name': null,
  'studio': null,
  'subtitle': null,
  'synopsis': null,
  'synopsis_short': null,
  'tags': null,
  'thumb': '',
  'thumb_list': null,
  'title': 'ยามาฮ่าลีกวัน 2558 นัดที่ 30',
  'trailer': null,
  'update_date':  new Date(),
  'week_day': null,
  'week_number': null,
  'writer': null
};
router.get('/addContent', function(req, res) {
  if (!req.query.lang) {
    req.query.lang = 'th';
  }
  req.query.lang = req.query.lang.toLowerCase();

  if (!req.query.id) {
    return res.status(400).send({
      code: 400,
      message: 'There have been validation errors: id'
    });
  }

  demo_insert2.getContent(req.query.lang, req.query.id, function(err, result) {
    if (err) {
      return res.status(err.code).send({
        code: err.code,
        message: err.message
      });
    } else {
      if (result.rowLength > 0) {
        const json_data = Object.assign({}, result.first(), req.body);

        demo_insert.addContent(json_data, function(err, result) {
          if (err){
            return res.status(400).send({
              code: 400,
              message: 'Data cannot be updated.'
            });
          }else {
            return res.status(200).send({
              code: 200,
              id: json_data.id,
              message: 'ID ' + json_data.id +
                ' has been successfully updated.'
            });
          }

        });

      } else {
        return res.status(404).send({
          code: 404,
          message: 'Data not found.'
        });
      }
    }
  });
});

router.post('/addData', function(req, res) {

    // var test_json = {
    //   "lang": "th",
    //   "id": "4",
    //   "create_date": new Date()
    // };

    demo_insert2.addContent(test_json, function(err, result) {
      if (err) console.log(err);
      return res.send({
        "code": "200",
        id: test_json.id,
        message: 'ID ' + test_json.id +
          ' has been successfully updated.'
      });
    });

});

router.post('/addJsonData', function(req, res) {

    demo_insert2.addContent(data, function(err, result) {
      if (err) console.log(err);
      return res.send({
        "code": "200",
        id: data.id,
        message: 'ID ' + data.id +
          ' has been successfully updated.'
      });
    });

});


module.exports = router;
