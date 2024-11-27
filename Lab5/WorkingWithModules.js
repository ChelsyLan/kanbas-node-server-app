const module = {
    id:"0001",
    name:"Introduction to Chapter 1",
    description:"The fundamental of CS",
    course:"CS5001",
}
export default function WorkingWithModules(app){
    // get module
    app.get("/lab5/module",(req,res)=>{
        res.json(module);
    });

    // get module name
    app.get("/lab5/module/name",(req,res)=>{
        res.json(module.name);
    });

    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
      });
    
      app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
      });
}