import React, { useEffect, useState } from "react";
import Block from "./Block";

function Blocks() {
	const [blocks, setBlocks] = useState([]);

	useEffect(() => {
		fetch(`${document.location.origin}/api/blocks`)
			.then((response) => response.json())
			.then((json) => setBlocks(json));
	}, []);

	return (
		<div>
			<h3 className="heading">Blocks</h3>
			{blocks.map((block) => {
				return (
					<Block key={block.hash} block={block}>
						{block.hash}
					</Block>
				);
			})}
		</div>
	);
}

export default Blocks;
