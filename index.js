const exprees =  require("express");
const puppeteer = require("puppeteer")
const app = exprees();

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    try{
        res.render("index")
    }catch(err){
        console.log(err)
    }
   
})

app.get("/screenshot", async(req,res)=>{
    try{
        const url = req.query.url;
        const browser = await puppeteer.launch({
            headless:true,
            args: ["--no-sandbox"]        
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 720,
        });
        await page.goto(url);
        await page.waitForTimeout(1500);
        const buffer  = await page.screenshot();
        res.header("Content-Type", "image/png");
        res.header("Content-Disposition", "inline; filename=screenshot.png");
        return res.send(buffer);
    }catch(err){
        console.log(err)
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("web screenshoot!");
})