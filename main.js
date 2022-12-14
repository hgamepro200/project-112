var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
height: 350,
width: 300,
image_format: "png",
png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    })
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

console.log("ml5 version:", ml5.version);
image_classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6IOV5JATj/model.json", modelLoaded);

function modelLoaded(){
    console.log("model_loaded!");
}

function check()
{
    img = document.getElementById("captured_image");
    image_classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
if(error)
{
    console.error(error);
}
else
{
    console.log(result)
    document.getElementById("result_gesture_name").innerHTML = result[0].label;
    document.getElementById("result_gesture_name2").innerHTML = result[1].label;
    prediction_1 = result[0].label;
    prediction_2 = result[1].label;
    speak();
    if(result[0].label == "ok")
    {
        document.getElementById("update_gesture").innerHTML = "&#128077;";
    }
    if(result[0].label == "cool")
    {
        document.getElementById("update_gesture").innerHTML = "&#9996;";
    }
    if(result[0].label == "amazing")
    {
        document.getElementById("update_gesture").innerHTML = "&#128076;";
    }
    if(result[1].label == "ok")
    {
        document.getElementById("update_gesture2").innerHTML = "&#128077;";
    }
    if(result[1].label == "cool")
    {
        document.getElementById("update_gesture2").innerHTML = "&#9996;";
    }
    if(result[1].label == "amazing")
    {
        document.getElementById("update_gesture2").innerHTML = "&#128076;";
    }
}
}