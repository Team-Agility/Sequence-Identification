// Services: all redux-logic services

import { projectService } from "./modules/projects/ducks";
import { authService } from "./modules/auth/ducks";


// Export all redux-logics
export default [
    ...projectService, 
    ...authService
];
