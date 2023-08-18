// ==UserScript==
// @name         Amazon stars rating
// @namespace    V@no
// @author       V@no
// @description  Restore stars rating on Amazon product pages
// @include      https://www.amazon.*/*
// @license      MIT
// @version      1.0.1
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
	for (let i = 0; i < nlSingleStar.length; i++)
	{
		const el = nlSingleStar[i];
		const ratingFull = el.textContent;
		const rating = ratingFull.split(".");
		rating[1] = rating[1][0];
		if (rating[1] > 6 && rating[0] < 4)
			rating[0] = ++rating[0];

		const stars = rating[0] + (rating[1] > 2 && rating[1] < 8 ? "-5" : "");
		el.classList.remove("puis-review-star-single", "a-star-small-5");
		el.classList.add("a-star-small-" + stars);
		//rating count
		const elRatingCount = el.closest(".a-section").querySelector(".a-size-base.s-underline-text");
		if (!elRatingCount.textContent)
		{
			const elRatingCountBox = elRatingCount.closest("[aria-label]");
			elRatingCount.textContent = elRatingCountBox.ariaLabel;
			const elFiveStarPercent = elRatingCountBox.nextSibling.firstChild.firstChild;
			elFiveStarPercent.nodeValue = "(" + elFiveStarPercent.nodeValue + ")";
		}
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

document.addEventListener("DOMContentLoaded", () =>
{
});
})();