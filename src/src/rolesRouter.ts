import express from 'express';
import Role from '../models/roles'

//instantiate router.
const rolesRouter = express.Router();


//routes
rolesRouter.get('/roles', async (req, res, next) => {
  const allRoles = await Role.find({});
  res.status(200).json(allRoles)
})

rolesRouter.post('/roles', async (req, res, next) => {
  const newRole = new Role(req.body);
  const createdRole = await newRole.save();
  res.status(201).json(createdRole);
})




export default rolesRouter;