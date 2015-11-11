var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://@localhost/taco_types";
 

/* GET users listing. */
router.get('/', function(req, res, next) {
 pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM tacos', function(err, result) {
    done();
    res.render('tacos/index', {tacos: result.rows});

    if(err) {
      return console.error('error running query', err);
    }
  });
});
});


router.get('/new', function(req, res, next){
  res.render('tacos/new');
})


router.post('/', function(req, res, next) {
 pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('INSERT INTO tacos(shell, taste) VALUES($1, $2) returning id', [req.body.shell, req.body.taste], function(err, result) {
    done();
    res.redirect('/tacos/' + result.rows[0].id);

    if(err) {
      return console.error('error running query', err);
    }
  });
});
});


router.get('/:id', function(req, res, next){
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM tacos WHERE id =' + req.params.id, function(err, result) {
    done();
    res.render('tacos/show' , {taco: result.rows[0]});

    if(err) {
      return console.error('error running query', err);
    }
  });
});
});

router.get('/:id/edit', function(req, res, next){
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM tacos WHERE id =' + req.params.id, function(err, result) {
    done();
    res.render('tacos/edit', {taco: result.rows[0]});

    if(err) {
      return console.error('error running query', err);
    }
  });
});
});

router.post('/:id', function(req, res, next){
 pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  console.log(req.params.id)
  client.query('UPDATE tacos SET shell=($1), taste=($2) WHERE id=' + req.params.id, [req.body.shell, req.body.taste], function(err, result) {
    done();
    res.redirect('/tacos')

    if(err) {
      return console.error('error running query', err);
    }
  });
});
});

router.post('/:id/delete', function(req, res, next){
   pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  console.log(req.params.id)
  client.query('DELETE FROM tacos WHERE id=' + req.params.id, function(err, result) {
    done();
    res.redirect('/tacos')

    if(err) {
      return console.error('error running query', err);
    }
  });
});
})























module.exports = router;
