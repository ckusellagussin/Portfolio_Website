// Check for required elements on page load
        document.addEventListener('DOMContentLoaded', () => {
            const requiredElements = [
                'homeContent',
                'projects',
                'projectDetail',
                'blogPage',
                'blogPosts'
            ];
            
            requiredElements.forEach(id => {
                if (!document.getElementById(id)) {
                    console.warn(`Required element #${id} not found`);
                }
            });
            
            // Initialize videos
            const videos = document.querySelectorAll('.project-video');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target;
                    if (video.tagName === 'VIDEO') {
                        if (entry.isIntersecting) {
                            // Try to play the video
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    // Autoplay was prevented, mute and try again
                                    video.muted = true;
                                    video.play().catch(() => {
                                        console.log('Video autoplay prevented:', error);
                                    });
                                });
                            }
                        } else {
                            // Video is out of view, pause it
                            video.pause();
                        }
                    }
                });
            }, {
                threshold: 0.25,
                rootMargin: '0px 0px -50px 0px'
            });

            videos.forEach(video => {
                if (video.tagName === 'VIDEO') {
                    // Set video attributes
                    video.muted = true;
                    video.loop = true;
                    video.playsInline = true;
                    video.preload = 'metadata';
                    
                    observer.observe(video);
                }
            });
            
            // Initialize project card interactions
            initProjectCards();
            
            // Initialize blog posts (but don't load them yet)
            initializeBlog();
        });

        // Project card tilt effect
        function initProjectCards() {
            document.querySelectorAll('.project-card').forEach(card => {
                let frameId = null;
                
                card.addEventListener('mousemove', (e) => {
                    if (frameId) {
                        cancelAnimationFrame(frameId);
                    }
                    
                    frameId = requestAnimationFrame(() => {
                        const rect = card.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        
                        const deltaX = (e.clientX - centerX) / (rect.width / 2);
                        const deltaY = (e.clientY - centerY) / (rect.height / 2);
                        
                        const tiltX = deltaY * 5;
                        const tiltY = -deltaX * 5;
                        const scale = 1.02;
                        
                        card.style.transform = `
                            perspective(1000px) 
                            rotateX(${tiltX}deg) 
                            rotateY(${tiltY}deg) 
                            scale(${scale}) 
                            translateY(-5px)
                        `;
                        card.style.transition = 'transform 0.1s ease-out';
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    if (frameId) {
                        cancelAnimationFrame(frameId);
                    }
                    
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateY(0)';
                    card.style.transition = 'transform 0.3s ease-out';
                });
                
                card.addEventListener('click', (e) => {
            if (card.classList.contains('locked-card')) return;
                    e.preventDefault();
                    const projectId = card.getAttribute('data-project');
                    if (projectId) {
                        openProjectDetail(projectId);
                    }
                });
            });
        }

        // Page navigation
        
function switchSubtab(tab) {
    // Remove active from all buttons
    document.querySelectorAll('.subtab-btn').forEach(btn => btn.classList.remove('active'));
    // Add active to clicked button
    event.target.classList.add('active');
    // Hide all content
    document.querySelectorAll('.subtab-content').forEach(el => el.style.display = 'none');
    // Show selected content
    document.getElementById('subtab-content-' + tab).style.display = 'block';
}

function showHome() {
            // Close all open pages
            document.querySelectorAll('.page-section, .blog-page, .project-detail, .blog-post-detail').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show home content
            document.getElementById('homeContent').style.display = 'block';
            document.getElementById('projects').style.display = 'block';
            document.body.style.overflow = 'auto';
    document.querySelector('.subtab-btn.active').click();
        }

        function openAboutPage() {
            document.getElementById('aboutPage').classList.add('active');
            document.getElementById('homeContent').style.display = 'none';
            document.getElementById('projects').style.display = 'none';
            document.body.style.overflow = 'hidden';
        }

        function openCVPage() {
            document.getElementById('cvPage').classList.add('active');
            document.getElementById('homeContent').style.display = 'none';
            document.getElementById('projects').style.display = 'none';
            document.body.style.overflow = 'hidden';
        }

        function closePage(pageId) {
            document.getElementById(pageId).classList.remove('active');
            document.getElementById('homeContent').style.display = 'block';
            document.getElementById('projects').style.display = 'block';
            document.body.style.overflow = 'auto';
    document.querySelector('.subtab-btn.active').click();
        }



        let currentBlogPage = 1;
        const blogPostsPerPage = 6;

        // Initialize blog system
        function initializeBlog() {
            // Check if blogPostsData exists
            if (typeof blogPostsData === 'undefined') {
                console.error('blogPostsData is not defined!');
                return;
            }
            console.log('Blog posts data loaded:', blogPostsData.length, 'posts');
        }

        function loadBlogPosts() {
            const container = document.getElementById('blogPosts');
            if (!container) {
                console.error('Blog posts container not found!');
                return;
            }
            
            container.innerHTML = '';
            
            if (!blogPostsData || blogPostsData.length === 0) {
                container.innerHTML = `
                    <div class="no-posts">
                        <p>No blog posts yet. Check back soon!</p>
                    </div>
                `;
                return;
            }
            
            // Calculate which posts to show
            const startIndex = (currentBlogPage - 1) * blogPostsPerPage;
            const endIndex = startIndex + blogPostsPerPage;
            const postsToShow = blogPostsData.slice(startIndex, endIndex);
            
            postsToShow.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'blog-post';
                postElement.setAttribute('data-post-id', post.id);
                postElement.innerHTML = `
                    <div class="blog-post-date">${post.date || 'No date'}</div>
                    <h3>${post.title || 'Untitled'}</h3>
                    <p class="blog-post-excerpt">${post.excerpt || 'No excerpt available.'}</p>
                    <div class="blog-post-tags">
                        ${(post.tags && post.tags.length > 0) 
                            ? post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('') 
                            : '<span class="blog-tag">General</span>'}
                    </div>
                `;
                
                postElement.addEventListener('click', () => openBlogPost(post.id));
                container.appendChild(postElement);
            });
            
            // Add pagination if needed
            if (blogPostsData.length > blogPostsPerPage) {
                addBlogPagination();
            }
        }

        function addBlogPagination() {
            const container = document.getElementById('blogPosts');
            const totalPages = Math.ceil(blogPostsData.length / blogPostsPerPage);
            
            const pagination = document.createElement('div');
            pagination.className = 'blog-pagination';
            pagination.innerHTML = `
                <button ${currentBlogPage <= 1 ? 'disabled' : ''} onclick="changeBlogPage(${currentBlogPage - 1})">
                    Previous
                </button>
                <span>Page ${currentBlogPage} of ${totalPages}</span>
                <button ${currentBlogPage >= totalPages ? 'disabled' : ''} onclick="changeBlogPage(${currentBlogPage + 1})">
                    Next
                </button>
            `;
            
            container.appendChild(pagination);
        }

        function changeBlogPage(page) {
            if (page < 1 || page > Math.ceil(blogPostsData.length / blogPostsPerPage)) {
                return;
            }
            currentBlogPage = page;
            loadBlogPosts();
        }

        function openBlog() {
            loadBlogPosts(); // Load posts when opening blog
            document.getElementById('blogPage').classList.add('active');
            document.getElementById('homeContent').style.display = 'none';
            document.getElementById('projects').style.display = 'none';
            document.body.style.overflow = 'hidden';
        }

        function closeBlog() {
            document.getElementById('blogPage').classList.remove('active');
            document.getElementById('homeContent').style.display = 'block';
            document.getElementById('projects').style.display = 'block';
            document.body.style.overflow = 'auto';
    document.querySelector('.subtab-btn.active').click();
        }

        function openBlogPost(postId) {
            const post = blogPostsData.find(p => p.id === postId);
            if (!post) {
                console.error('Blog post not found:', postId);
                return;
            }

            document.getElementById('blogPostTitle').textContent = post.title || 'Untitled';
            document.getElementById('blogPostDate').textContent = post.date || 'No date';
            document.getElementById('blogPostReadTime').textContent = post.readTime || '5 min read';
            document.getElementById('blogPostContent').innerHTML = post.content || '<p>Content not available.</p>';
            
            document.getElementById('blogPostDetail').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeBlogPost() {
            document.getElementById('blogPostDetail').classList.remove('active');
            document.body.style.overflow = 'hidden';
        }

        function openProjectDetail(projectId) {
            const detail = document.getElementById('projectDetail');
            detail.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Reset scroll position
            detail.scrollTop = 0;

            const data = projectData[projectId];
            if (!data) {
                console.error('Project data not found:', projectId);
                return;
            }
            
            document.getElementById('detailTitle').textContent = data.title;

            const mediaContainer = document.getElementById('detailMedia');
            mediaContainer.innerHTML = ''; // Clear previous content
            
            if (data.youtube) {
                mediaContainer.innerHTML = `
                    <iframe 
                        src="${data.youtube}?autoplay=1&mute=1" 
                        title="${data.title} video"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            } else if (data.embed && data.iframe) {
                mediaContainer.innerHTML = `
                    <iframe 
                        src="${data.iframe}" 
                        frameborder="0" 
                        allowfullscreen
                        title="${data.title} interactive demo">
                    </iframe>
                `;
            } else if (data.video) {
                mediaContainer.innerHTML = `
                    <video 
                        controls 
                        autoplay 
                        muted 
                        playsinline
                        style="width:100%; height:100%; object-fit:contain;">
                        <source src="${data.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            } else if (data.image) {
                mediaContainer.innerHTML = `
                    <img 
                        src="${data.image}" 
                        alt="${data.title}"
                        style="width:100%; height:100%; object-fit:cover;">
                `;
            }

            // Hide media container if no media provided
            const hasMedia = data.youtube || data.embed || data.video || data.image;
            mediaContainer.style.display = hasMedia ? '' : 'none';
            const contentEl = document.querySelector('.project-detail-content');
            if (contentEl) { contentEl.classList.toggle('no-media', !hasMedia); }

            document.getElementById('detailDescription').textContent = data.description;
            document.getElementById('detailExtra').innerHTML = data.extra || '';
            
            // Handle technologies list
            const techList = document.getElementById('detailTech');
            techList.innerHTML = '';
            if (data.tech && Array.isArray(data.tech)) {
                data.tech.forEach(tech => {
                    const li = document.createElement('li');
                    li.textContent = tech;
                    techList.appendChild(li);
                });
            }
            
            // Handle features list
            const featuresList = document.getElementById('detailFeatures');
            featuresList.innerHTML = '';
            if (data.features && Array.isArray(data.features)) {
                data.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
            }
            
            // Handle GitHub repository link
            const repoContainer = document.getElementById('detailRepo');
            if (data.github) {
                repoContainer.innerHTML = `
                    <a href="${data.github}" target="_blank" rel="noopener noreferrer">
                        <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        <div class="repo-title">View Repository</div>
                    </a>
                `;
            } else {
                repoContainer.innerHTML = '';
            }
            
            enableProjectMediaScroll();
        }

        function closeProjectDetail() {
            // Stop all media
            const mediaContainer = document.getElementById('detailMedia');
            if (mediaContainer) {
                const video = mediaContainer.querySelector('video');
                const iframe = mediaContainer.querySelector('iframe');
                
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
                
                if (iframe) {
                    // Reset iframe source to stop any playing content
                    const src = iframe.src;
                    iframe.src = '';
                    iframe.src = src;
                }
            }
            
            resetProjectMediaScroll();
            document.getElementById('projectDetail').classList.remove('active');
            document.body.style.overflow = 'auto';
    document.querySelector('.subtab-btn.active').click();
        }

        // Scroll-linked media movement (project detail)
        let projectScrollHandler = null;

        function enableProjectMediaScroll() {
            const detail = document.getElementById('projectDetail');
            const media = document.querySelector('.project-detail-video');
            
            if (!detail || !media) return;
            
            // Remove existing handler if any
            if (projectScrollHandler) {
                detail.removeEventListener('scroll', projectScrollHandler);
            }
            
            projectScrollHandler = () => {
                const scrollY = detail.scrollTop || 0;
                const offset = Math.min(scrollY * 0.25, 140);
                media.style.transform = `translateY(${offset}px)`;
            };
            
            detail.addEventListener('scroll', projectScrollHandler);
            // Trigger once to set initial position
            projectScrollHandler();
        }

        function resetProjectMediaScroll() {
            const detail = document.getElementById('projectDetail');
            const media = document.querySelector('.project-detail-video');
            
            if (detail && projectScrollHandler) {
                detail.removeEventListener('scroll', projectScrollHandler);
                projectScrollHandler = null;
            }
            
            if (media) {
                media.style.transform = 'translateY(0)';
            }
        }

        // ESC key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Check what's currently open and close it
                if (document.getElementById('projectDetail').classList.contains('active')) {
                    closeProjectDetail();
                } else if (document.getElementById('blogPostDetail').classList.contains('active')) {
                    closeBlogPost();
                } else if (document.getElementById('aboutPage').classList.contains('active')) {
                    closePage('aboutPage');
                } else if (document.getElementById('cvPage').classList.contains('active')) {
                    closePage('cvPage');
                } else if (document.getElementById('blogPage').classList.contains('active')) {
                    closeBlog();
                }
            }
        });
    
        // Light/Dark mode toggle
        function toggleTheme() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
            document.getElementById('themeLabel').textContent = isDark ? 'Light' : 'Dark';
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        }

        // Apply saved theme on load
        (function() {
            const saved = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', saved);
            document.addEventListener('DOMContentLoaded', function() {
                const label = document.getElementById('themeLabel');
                if (label) label.textContent = saved === 'dark' ? 'Dark' : 'Light';
            });
        })();
