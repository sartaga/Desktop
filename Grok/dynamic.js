function loadSidebar() {
    fetch('sidebar.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load sidebar data');
            return response.json();
        })
        .then(data => {
            const sidebar = document.getElementById('sidebar');
            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'sidetitle';
                sectionDiv.textContent = section.title;
                sidebar.appendChild(sectionDiv);

                const ul = document.createElement('ul');
                ul.className = 'menulines';
                section.links.forEach(link => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.textContent = link.text;
                    a.target = link.target;
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                sidebar.appendChild(ul);
            });
        })
        .catch(error => {
            console.error('Error loading sidebar:', error);
            document.getElementById('sidebar').innerHTML = '<p>Error loading sidebar.</p>';
        });
}

function loadTabContent(page, elementId) {
    fetch(page)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading tab content:', error);
            document.getElementById(elementId).innerHTML = '<p>Error loading page.</p>';
        });
}