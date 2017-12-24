var express = require('express')
var router = express()
const models = require('../models/index');
var userController = require('../controllers/UserController');
var projectController = require('../controllers/ProjectController');
var noteController = require('../controllers/NoteController');
var cookieParser = require("cookie-parser")
router.use(cookieParser());

router.use(express.json())
router.use(express.urlencoded({extended : true}))

router.route('/users').get(userController.findAll);
router.route('/users/:id').get(userController.findById);
router.route('/users').post(userController.create);
router.route('/users/:id').put(userController.update);
router.route('/users/:id').delete(userController.delete);
router.route('/users/find/:name').get(userController.checkUsername);
router.route('/users/info/:name').get(userController.getInfo);
router.route('/users/authenticate').post(userController.authenticate);
router.route('/users/token/:token').get(userController.getToken);
router.route('/token/fetch').get(userController.fetchToken);
router.route('/check').get(userController.checkToken);
router.route('/token').delete(userController.deleteToken);

router.route('/users/:userId/projects').get(projectController.findAll);
router.route('/projects/:id').get(projectController.findById);
router.route('/projects').post(projectController.create);
router.route('/projects/:id').put(projectController.update);
router.route('/projects/:id').delete(projectController.delete);

router.route('/projects/:projectId/notes').get(noteController.findAll);
router.route('/notes/:id').get(noteController.findById);
router.route('/notes').post(noteController.create);
router.route('/notes/:id').put(noteController.update);
router.route('/notes/:id').delete(noteController.delete);

module.exports = router;