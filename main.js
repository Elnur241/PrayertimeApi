let longitude=document.querySelector("#longitude");
let latitude=document.querySelector("#latitude");
let datetime=document.querySelector("#datetime");
let btn=document.querySelector("#btn");
let tname=document.querySelector(".tname")
let tbody=document.querySelector(".tbody");
let span=document.querySelector(".span");
let span2=document.querySelector(".span2");
var monthControl = document.querySelector('input[type="month"]');



btn.addEventListener("click",function(){
    if(longitude.value.length==0||latitude.value.length==0|| monthControl.value.length==0){

        alert("Please fill the inputs");
        return;
    }
    if(isNaN(longitude.value)||isNaN(latitude.value)){
        alert("Please enter number");
        return;
    }
    if((monthControl.value).split("-")[0]<2000){
        alert("Year must more than 2000");
        return;
    }
    let request=new XMLHttpRequest();
    tname.classList.remove("d-none");
    span.classList.remove("d-none");
    span2.classList.remove("d-none");
    span.classList.add("fw-bold");
    span2.classList.add("fw-bold");
    console.log((monthControl.value).split("-")[0])
    console.log((monthControl.value).split("-")[1])
    request.onload=function(){
    
        let preq=JSON.parse(request.responseText);
         span.innerText=preq.data[0].meta.timezone;
         span2.innerText=monthControl.value;
        console.log(preq);
        for (const item of preq.data) {
          let day=document.createElement("td");
           day.innerText=item.date.gregorian.day;
            let Fajr=document.createElement("td");
            Fajr.innerText=(item.timings.Fajr).split(" ",1);
            let Sunrise=document.createElement("td")
            Sunrise.innerText=(item.timings.Sunrise).split(" ",1);
            let Dhuhr=document.createElement("td");
            Dhuhr.innerText=(item.timings.Dhuhr).split(" ",1);
            let Asr=document.createElement("td");
            Asr.innerText=(item.timings.Asr).split(" ",1);
            let Sunset=document.createElement("td")
            Sunset.innerText=(item.timings.Sunset).split(" ",1);
            let Maghrib=document.createElement("td")
            Maghrib.innerText=(item.timings.Maghrib).split(" ",1);
            let Isha=document.createElement("td")
            Isha.innerText=(item.timings.Isha).split(" ",1);
            let Imsak=document.createElement("td")
            Imsak.innerText=(item.timings.Imsak).split(" ",1);
            let Midnight=document.createElement("td")
            Midnight.innerText=(item.timings.Midnight).split(" ",1);
      
            let newtr=document.createElement("tr");
            newtr.append(day);
            newtr.append(Fajr);
            newtr.append(Sunrise);
            newtr.append(Dhuhr);
            newtr.append(Asr);
            newtr.append(Sunset);
            newtr.append(Maghrib);
            newtr.append(Isha);
            newtr.append(Imsak);
            newtr.append(Midnight);
           
            tbody.append(newtr);
        }
    }
  
 request.open("get"," http://api.aladhan.com/v1/calendar?latitude="+latitude.value+"&longitude="+longitude.value+"&method=2&month="+(monthControl.value).split("-")[1]+"&year="+(monthControl.value).split("-")[0]);
request.send();
})
