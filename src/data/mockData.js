const d=n=>{const x=new Date();x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
export const jobs=[
{id:1,company:'Zoho',title:'Software Developer',location:'Chennai',type:'Full-time',package:8,skills:['Java','SQL','DSA'],dept:'CSE',minCgpa:7,deadline:d(3),posted:d(-10),desc:'Build scalable SaaS features with a product engineering team.',process:['Online test','Technical interview','HR round']},
{id:2,company:'Freshworks',title:'Frontend Developer',location:'Chennai',type:'Full-time',package:10,skills:['React','JavaScript','CSS'],dept:'CSE',minCgpa:7.5,deadline:d(9),posted:d(-4),desc:'Craft responsive customer-facing interfaces in React.',process:['Coding task','Tech panel','Culture fit']},
{id:3,company:'Infosys',title:'Data Analyst',location:'Bengaluru',type:'Full-time',package:6.5,skills:['Python','SQL','Excel'],dept:'IT',minCgpa:6.5,deadline:d(14),posted:d(-6),desc:'Turn business data into dashboards and insights.',process:['Aptitude','Case interview','HR']},
{id:4,company:'Kissflow',title:'UI/UX Designer',location:'Remote',type:'Internship',package:4,skills:['Figma','Research'],dept:'Design',minCgpa:6,deadline:d(6),posted:d(-2),desc:'Design workflows for no-code business tools.',process:['Portfolio review','Design challenge']},
{id:5,company:'AWS Partner Labs',title:'Cloud Engineer',location:'Hyderabad',type:'Full-time',package:12,skills:['AWS','Linux','Docker'],dept:'ECE',minCgpa:7.5,deadline:d(20),posted:d(-1),desc:'Operate and automate cloud infrastructure.',process:['Online test','Hands-on lab','Interview']},
{id:6,company:'Cognizant',title:'QA Engineer',location:'Coimbatore',type:'Full-time',package:5,skills:['Selenium','Testing'],dept:'CSE',minCgpa:6,deadline:d(1),posted:d(-12),desc:'Own test automation for enterprise clients.',process:['Aptitude','Technical','HR']}];
export const seedApps=[
{id:'a1',jobId:3,date:d(-8),status:'Interview Scheduled',interview:{date:d(2),time:'10:30 AM',type:'Technical',round:'Round 2',where:'Google Meet'}},
{id:'a2',jobId:4,date:d(-5),status:'Shortlisted'},
{id:'a3',jobId:6,date:d(-9),status:'Selected'}];
export const seedNotes=[
{id:1,type:'Interview',text:'Infosys interview scheduled in 2 days.',time:'2h ago',read:false},
{id:2,type:'Company',text:'Cognizant selected you for QA Engineer!',time:'1d ago',read:false},
{id:3,type:'Announcement',text:'Campus drive: Freshworks registration is open.',time:'3d ago',read:true}];
export const STAGES=['Applied','Under Review','Shortlisted','Interview Scheduled','Selected'];
export const daysLeft=s=>Math.ceil((new Date(s)-new Date(new Date().toDateString()))/864e5);
