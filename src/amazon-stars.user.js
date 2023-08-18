// ==UserScript==
// @name         Amazon Stars
// @namespace    V@no
// @author       V@no
// @description  Restore stars rating on Amazon product pages
// @include      https://www.amazon.com/*
// @license      MIT
// @version      1.0
// @run-at       document-start
// @grant        none
// ==/UserScript==

//tab = 4 spaces

(() =>
{
"use strict";

const processNode = node =>
{
	if (!node.querySelectorAll) return;

	const nlSingleStar = node.querySelectorAll(".puis-review-star-single");
	for (let k = 0; k < nlSingleStar.length; k++)
	{
		const el = nlSingleStar[k];
		const ratingFull = el.textContent;
		const rating = ratingFull.split(".");
		rating[1] = rating[1][0];
		if (rating[1] > 6 && rating[0] < 4)
			rating[0] = ++rating[0];

		const stars = rating[0] + (rating[1] > 2 && rating[1] < 8 ? "-5" : "");
		el.classList.remove("puis-review-star-single", "a-star-small-5");
		el.classList.add("a-star-small-" + stars);
	}
};

new MutationObserver(mutations =>
{
	for (let i = 0; i < mutations.length; i++)
	{
		const addedNodes = mutations[i].addedNodes;
		if (!addedNodes) continue;

		for (let j = 0; j < addedNodes.length; j++)
			processNode(addedNodes[j]);
	}
}).observe(document, { childList: true, subtree: true });

})();