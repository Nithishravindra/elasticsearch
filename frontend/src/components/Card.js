import React from 'react';

function Card(props) {
	return(
		<div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
			<div>
				<h1>fileName: {props.fileName}</h1>
				<h2>Title: {props.title}</h2>
				<p>{props.body}</p> 
			</div>
		</div>
	);
}

export default Card;