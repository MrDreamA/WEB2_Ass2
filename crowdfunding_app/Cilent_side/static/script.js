document.addEventListener('DOMContentLoaded', () => {
    fetch('/API/fundraisers')
        .then(response => response.json())
        .then(data => {
            const fundraiserList = document.getElementById('database');
            data.forEach(fundraiser => {
                const listItem = document.createElement('X');
                listItem.textContent = `${fundraiser.caption} - ${fundraiser.currentFunding}/${fundraiser.targetFunding} AUD`;
                fundraiserList.appendChild(listItem);
            });
        });
});
