import { Router } from "express";
import { CreateClientController } from "./controllers/createClientController";
import { CreateUserController } from "./controllers/createUserController";
import { ListAllClientsByUserIdController } from "./controllers/listAllClientsByUserIdController";
import { ListAllUsersController } from "./controllers/listAllUsersController";
import { UpdateAttendanceController } from "./controllers/updateAttendanceController";

const router = Router()

const createUserController = new CreateUserController()
const createClientController = new CreateClientController()
const listAllClientsByUserIdController = new ListAllClientsByUserIdController()
const updateAttendanceController = new UpdateAttendanceController()
const listAllUsersController = new ListAllUsersController()

router.get('/', (req, res) => res.send('Hello World'))

router.get(
  '/users',
  listAllUsersController.handle
  )

router.post(
  '/users',
  createUserController.handle
  )

router.get(
  '/clients/:id',
  listAllClientsByUserIdController.handle
  )

router.post(
  '/clients',
  createClientController.handle
  )

router.put(
  '/attendance/:id',
  updateAttendanceController.handle
)

export { router };

