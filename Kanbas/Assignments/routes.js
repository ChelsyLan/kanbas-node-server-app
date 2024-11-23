import * as assignmentsDao from "./dao.js";
export default function AssignmentsRoutes(app){

  // put assignment
  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates= req.body;
    assignmentsDao.updateAssignment(assignmentId,assignmentUpdates);
    res.sendStatus(204);
  });

  // delete assignment HTTP
  app.delete("/api/assignments/:assignmentId",(req,res)=>{
    const {assignmentId} = req.params;
    assignmentsDao.deleteAssignment(assignmentId);
    res.sendStatus(204);
  })
}