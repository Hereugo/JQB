var professions = ["Biology", "Geography", "Geology", "Medicine", "Physics", "Chemistry", "Engineering", "metal", "woodworking", "Construction", "Military law", "History", "Literature", "Journalism", "Public activities", "Right, law", "the service Sector, manufacturing", "Mathematics", "Economics", "Foreign languages", "Visual arts", "Stage art", "Music", "Physical education and sport"]
var colors = ['#00D928','#FF9F1C','#5863F8','#17BEBB','#D00000','#820263','#F75C03','#ACB87A','#4C2719','#FFB800','#2B9720','#003B36','#0F8B8D','#FC2F00','#00A7E1','#D96C06','#2A7F62','#7B0D1E','#F8CA12','#74A4BC','#9BC53D','#2E294E','#E59500','#E71D36']
var results = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];

var currentQuestionId = 0;
var user = {
	'id': Date.now(),
	'answers': []
};

var ctx = document.getElementById('pie').getContext('2d');

var data = {
	labels: professions,
	datasets: [{
		data: results,
		backgroundColor: colors,
	}]
};

//create Chart class object
var chart = new Chart(ctx, {
	type: "doughnut",
	data: data,
	options: {
		responsive: true,
		legend: {
			display: true,
			position: "right",
			labels: {
				fontColor: "#333",
				fontSize: 14
			}
		}
	}
});
document.querySelector('.start-test').addEventListener('click', function() { //activates test
	document.querySelector('.container').style.display = 'flex';
		
	document.querySelector('.question').innerText = test[0].question;
	document.querySelector('.numquestions').innerText = String(currentQuestionId + 1) + ' / 112';

	let arr = document.querySelectorAll('.choice-item>button');
	for (let i=0; i<arr.length; i++) {
		arr[i].label = String(i + 1);
		arr[i].addEventListener('click', function() {
			if (currentQuestionId + 1>= test.length) {
				document.querySelector('.container').style.display = 'none';
				document.querySelector('.recommend-container').style.display = 'flex';


				jobs.forEach((a) => {
					let good = false;
					for (let i=0; i<a[1].length; i++) {
						let s = a[1][i].match(/\S+/)[0];
						let val = parseInt(a[1][i].match(/\d+/)[0]);
						for (let j=0; j<professions.length; j++) {
							if (professions[j] == s && val <= results[j])
								good = true;
						}
					}
					if (good) {
						let li = document.createElement('li');
						li.classList.add('choice-item');

						let btn = document.createElement('button');
						btn.innerText = a[0];
						btn.classList.add('rec');
						li.appendChild(btn);
						document.querySelector('#recommend').appendChild(li);
					}
				});

				return;
			}

			user.answers[currentQuestionId] = this.label;
			document.querySelector('.question').innerText = test[currentQuestionId + 1].question;
			document.querySelector('.numquestions').innerText = String(currentQuestionId + 1) + ' / 112';

			test[currentQuestionId].subjects.forEach((sub) => {
				let id = 0;
				for (let j=0; j<professions.length; j++) if (sub == professions[j]) id = j;
				let prev = results[id];

				switch(this.label) {
					case "1": {
						results[id] += 10;
						break;
					}
					case "2": {
						results[id] += 5;
						break;
					}
					case "3": {
						results[id] += 0;
						break;
					}
					case "4": {
						results[id] -= 5; 
						break;
					}
					case "5": {
						results[id] -= 10;
						break;
					}
				}
				let val = results[id] - prev;
				if (val > 0) {
					sendNotification(`${sub} increased by ${val}!`, colors[id]);
				} else if (val < 0) {
					sendNotification(`${sub} decreased by ${val}`, colors[id]);
				}
				results[id] = Math.max(0, results[id]);
			});

			chart.update();
			currentQuestionId++;
		}, false);
	}
	this.style.display = 'none';
}, false);

function sendNotification(text, clr) {
	let div = document.createElement('div');

	let p = document.createElement('p');
	p.innerText = text;

	let i = document.createElement('span');
	i.classList.add('material-icons');
	i.classList.add('unselectable');
	i.innerText = 'clear';

	div.classList.add("notification");
	div.appendChild(p);
	div.appendChild(i);
	div.style.backgroundColor = clr;

	let remo = () => {remove(div)};
	setTimeout(remo, 5*1000);
	i.onclick = remo;
	
	document.querySelector('.notify-container').appendChild(div);
}

const remove = (piu) =>{
	
	piu.style.animation = "MT 1s ease";

	setTimeout(function() {
		document.querySelector('.notify-container').removeChild(piu);
	}, 1*1000);
}