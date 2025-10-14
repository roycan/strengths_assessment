
    // =================================================================
    // DATA: All questions and style info from the Toastmasters PDF
    // =================================================================
    window.appData = {
        questions: [
            { text: "I focus on details, procedures, and rules." },
            { text: "I mobilize people toward a vision." },
            { text: "I create harmony and build emotional bonds." },
            { text: "I stringently establish and enforce rules." },
            { text: "I have a vision of the future and pursue excellence." },
            { text: "I develop people for the future." },
            { text: "I meet the needs of my team above my own." },
            { text: "My decisions are absolute and demand immediate compliance." },
            { text: "I build consensus through participation." },
            { text: "I set high standards for performance." },
            { text: "I provide long-term direction and focus on end-goals." },
            { text: "I encourage innovative ideas." },
            { text: "I personalize approaches to meet the individualized needs of my team." },
            { text: "I lead in order to better serve others." },
            { text: "I ask for ideas and get commitment through participation." },
            { text: "I concentrate on preparing individuals for the future by building skills." },
            { text: "I expect those I lead to be as dedicated to the work as I am." },
            { text: "I share a vision of the future and pursue excellence." },
            { text: "I demand immediate compliance." },
            { text: "I have more experience and knowledge than those I lead." },
            { text: "I promote and value friendly interactions." },
            { text: "I invite collaborative conversation." },
            { text: "I expect excellence and self-direction." },
            { text: "I lead by example." },
            { text: "I listen to the concerns of all members of the team." },
            { text: "I promote respect for my team members’ creativity." },
            { text: "I engage in top-down interactions." },
            { text: "I give clear direction and set standards." },
            { text: "I use praise and nurturing to build morale." },
            { text: "I am a good listener." },
            { text: "I delegate tasks to those who are most qualified." },
            { text: "I inspire enthusiasm for the mission." },
            { text: "I motivate by discipline." },
            { text: "I encourage team input." },
            { text: "I encourage my team members' creativity." },
            { text: "I am very detail-oriented." },
            { text: "I challenge my team members." },
            { text: "I empathize with others." },
            { text: "I am a skilled communicator." },
            { text: "I use my creativity to solve problems." },
            { text: "I am confident in my abilities." },
            { text: "I am an ethical leader." },
            { text: "I am good at building relationships." },
            { text: "I use collaboration to generate new ideas." },
            { text: "I am optimistic about future possibilities." },
            { text: "I am a good coach." },
            { text: "I am a good problem-solver." },
            { text: "I have a positive attitude." }
        ],
        scoringMap: {
            'Bureaucratic': [1, 4, 8, 19, 27, 36],
            'Authoritative': [2, 11, 20, 28, 32, 41],
            'Innovative': [5, 12, 18, 26, 35, 40],
            'Pacesetting': [10, 17, 23, 24, 31, 47],
            'Democratic': [9, 15, 25, 30, 34, 44],
            'Affiliative': [3, 21, 29, 39, 43, 48],
            'Coaching': [6, 16, 37, 45, 46, 42],
            'Altruistic': [7, 13, 14, 22, 38, 33]
        },
        stylesInfo: {
            'Bureaucratic': {
                description: "This leader stringently establishes and enforces rules, engages in top-down interactions, and motivates by discipline. Decisions are absolute and demand immediate compliance.",
                effectiveness: "Most effective when a decision has to be made in a short amount of time. It is not effective when trying to lead highly skilled individuals, as they often become resentful of micromanagement."
            },
            'Authoritative': {
                description: "This leader provides long-term direction, focuses on end-goals, and often has more experience than those they lead. They motivate by inspiring enthusiasm for the mission.",
                effectiveness: "Most effective when a change of direction or vision is required. It is less effective when explicit guidance is needed."
            },
            'Innovative': {
                description: "This leader shares a vision of the future, pursues excellence, and encourages innovative ideas. They motivate by promoting respect for team members' creativity and invite collaborative conversation.",
                effectiveness: "Most effective when solving complex problems. It can be less effective when risks taken make team members apprehensive."
            },
            'Pacesetting': {
                description: "This leader expects excellence and self-direction. They motivate by setting high standards and leading by example. They expect those they lead to be as dedicated as they are.",
                effectiveness: "Most effective when leading a team of highly skilled and self-motivated individuals. It can be ineffective if used for too long, as it may overwhelm team members."
            },
            'Democratic': {
                description: "This leader builds consensus through participation, asks for ideas, and gets commitment through teamwork. They listen to the concerns of all team members.",
                effectiveness: "Most effective when the leader is uncertain about the best course of action and needs to draw on the collective wisdom of the group. It is less effective in a crisis when immediate decisions are necessary."
            },
            'Affiliative': {
                description: "This leader creates harmony, builds emotional bonds, and promotes friendly interactions. They use praise and nurturing to build morale and value personal relationships.",
                effectiveness: "Most effective in increasing morale, repairing broken trust, and working through stressful circumstances. It is less effective when performance is not emphasized."
            },
            'Coaching': {
                description: "This leader concentrates on preparing individuals for the future by building skills. They motivate by challenging individuals and fostering personal gratification.",
                effectiveness: "Most effective in a one-on-one setting when the person being coached is receptive to the close working relationship. It is less effective when those being mentored are averse to change."
            },
            'Altruistic': {
                description: "This leader personalizes approaches to meet the individualized needs of the team and leads in order to better serve others. They focus on active listening, empathy, and commitment to building community.",
                effectiveness: "Effective in creating a positive culture and promoting high morale. It can be ineffective if not given sufficient time to apply a long-term perspective."
            }
        }
    };

  