let fileInput = document.getElementById("filepicker");
let innerImage = document.querySelector(".inner-upload-image");
let image=null;
let url = null;
let InputImg = document.getElementById("input-image")
let icon = document.querySelector("#icon")
let span = document.querySelector("span")
let OriginalImg = document.querySelector(".resultImg1 img")
let GeneratedImg =document.querySelector(".resultImg2 img")

let uploadBtn = document.querySelector("#upload-btn")
let style2 = document.querySelector(".style2")
let resultPage = document.querySelector(".result")
let loading = document.querySelector("#loading")
let downloadBtn =document.querySelector("#download")
let resetBtn =document.querySelector("#reset")


function handleUpload(){
    const ApiKey = "2BFBATs6seGEEkLS2tQ2UhD4";
    const formdata = new FormData();
    formdata.append("image_file", image);
    formdata.append("size", "auto");

    fetch("https://api.remove.bg/v1.0/removebg",{
        method: "POST",
        headers: { "X-Api-Key":ApiKey  },
        body: formdata,
    })
    .then(function(response){
        return response.blob();

    })
    .then(function(blob){
        loading.style.display="none";
        style2.style.display="none";
        resultPage.style.display="flex";
      url = URL.createObjectURL(blob);
      GeneratedImg.src= url;

    })
.catch()
}



innerImage.addEventListener("click" , ()=>{
    fileInput.click();
});
fileInput.addEventListener("change" ,()=>{
    image = fileInput.files[0];
    if(!fileInput)return;
    let reader = new FileReader();
    reader.onload=(e)=> {   
    InputImg.src =`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`
    InputImg.style.display="block"
    icon.style.display="none"
    span.style.display="none"
    OriginalImg.src =`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`
    }
    reader.readAsDataURL(image);


} )
 uploadBtn.addEventListener("click",()=>{
    handleUpload()
    loading.style.display="block";
 })
 
 function download(){

    fetch(url)
    .then(res =>res.blob())
    .then(file=>{
        let a= document.createElement("a");
        a.href = URL.createObjectURL(file)
        a.download = new Date().getTime();
        a.click();
    })
    .catch()
 }
 downloadBtn.addEventListener("click" , ()=>{
    download();
 })
 resetBtn.addEventListener("click" , ()=>{
    window.location.reload();
 })



gsap.from(".logo", {
    x: -300,
    opacity: 0,       
    duration: 2
});

gsap.from(".image", { 
   scale: 0.55,
      x: -300,
      
      opacity: 0,
      duration: 1.6,
      ease: "expo.out",
     

});
gsap.from(".text", { 
    x: -300,
    opacity: 0,     
    duration: 2
});
gsap.fromTo(".upload-image", 
  { y: 100, opacity: 0, scale: 0.93 }, 
  { 
    y: 0,
    opacity: 1,
    scale: 1.05,
    duration: 1.2,
    delay: 0.85,
    ease: "elastic.out(1.1, 0.6)",
    onComplete() {
      gsap.to(".upload-image", { scale: 1, duration: 0.2, ease: "power1.out" });
    }
  }
);
     gsap.fromTo(".footer-icon", 
    {
      y: 0,
      scale: 1,
    },
    {
      scrollTrigger: {
        trigger: ".footer-social",
        start: "top 90%", // starts when footer-social is 90% into viewport
      },
      y: -60,
      scale: 1.3,
      ease: "bounce.out",
      duration: 0.6,
      stagger: {
        each: 0.25,
        onComplete: function() {
          gsap.to(this.targets(), {
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            duration: 0.8,
            stagger: 0.25
          });
        }
      }
    }
  );
  gsap.from(".footer-brand",{
       x: -300,
    opacity: 0,       
    duration: 2
  })
  gsap.from(".footer-copy",{
       y: 300,
    opacity: 0,       
    duration: 2
  })

