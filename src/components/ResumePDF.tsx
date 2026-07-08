import React from 'react';
import { resumeData } from '../data';

interface ResumePDFProps {
  imageError: boolean;
  setImageError: (val: boolean) => void;
  profileImage: string | null;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({ imageError, setImageError, profileImage }) => {
  return (
    <div 
      className="fixed pointer-events-none" 
      style={{ left: 0, top: 0, zIndex: -1000, opacity: 1 }}
    >
      {/* PAGE 1 */}
      <div 
        id="resume-page-1" 
        className="w-[794px] h-[1122px] bg-white p-12 flex flex-col justify-between font-sans relative"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 opacity-40 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100 to-pink-100 opacity-40 rounded-tr-full pointer-events-none"></div>

        <div>
          {/* Header Banner */}
          <div className="border-b border-pink-100 pb-6 mb-6 flex items-start justify-between">
            <div className="max-w-[500px]">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight leading-none mb-2">
                {resumeData.name}
              </h1>
              <p className="text-purple-700 font-medium text-sm">
                {resumeData.title}
              </p>
            </div>
            
            {/* Contact details top-right */}
            <div className="text-right text-[11px] text-slate-500 leading-normal font-mono">
              <p className="font-semibold text-slate-600">Jammu & Kashmir, India</p>
              <p>{resumeData.email}</p>
              <p>{resumeData.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left Column (Narrow, 4/12) */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* Profile Image with fail-safe initials */}
              <div className="flex justify-center mb-2">
                <div className="relative w-28 h-28 rounded-full border-4 border-pink-100 overflow-hidden bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center shadow-sm">
                  {!imageError ? (
                    <img 
                      src={profileImage || "/profile.jpg"} 
                      alt={resumeData.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      SS
                    </span>
                  )}
                </div>
              </div>

              {/* Personal Details Panel */}
              <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-100/40">
                <h3 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-3 font-mono">
                  Contact
                </h3>
                <div className="flex flex-col gap-2 text-xs text-slate-600 leading-relaxed">
                  <div>
                    <span className="font-semibold block text-slate-700 text-[10px] uppercase font-mono">Email</span>
                    <span className="break-all">{resumeData.email}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-700 text-[10px] uppercase font-mono">Phone</span>
                    <span>{resumeData.phone}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-700 text-[10px] uppercase font-mono">Address</span>
                    <span>{resumeData.address}</span>
                  </div>
                </div>
              </div>

              {/* Languages Panel */}
              <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100/40">
                <h3 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-3 font-mono">
                  Languages
                </h3>
                <div className="flex flex-col gap-2">
                  {resumeData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-xs text-slate-700 font-medium">{lang}</span>
                      <div className="flex gap-1">
                        {/* Realistic proficiency markers */}
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div 
                            key={dot} 
                            className={`w-1.5 h-1.5 rounded-full ${
                              lang === 'English' && dot <= 4 ? 'bg-purple-600' :
                              lang === 'Hindi' && dot <= 5 ? 'bg-purple-600' :
                              lang === 'Urdu' && dot <= 5 ? 'bg-purple-600' : 'bg-purple-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Wide, 8/12) */}
            <div className="col-span-8 flex flex-col gap-6">
              {/* About Me / Profile Statement */}
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-pink-100 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-purple-600 rounded"></span> Profile Statement
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  {resumeData.aboutMe}
                </p>
              </div>

              {/* Career Objective */}
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-pink-100 pb-1 mb-2 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-purple-600 rounded"></span> Career Objective
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  {resumeData.careerObjective}
                </p>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-pink-100 pb-1 mb-3 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-purple-600 rounded"></span> Education History
                </h2>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xs font-semibold text-slate-800">
                        {edu.degree}
                      </h3>
                      <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                        {edu.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono mb-2">
                      <span>{edu.institution}</span>
                      <span>{edu.location}</span>
                    </div>
                    {edu.details && (
                      <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-1">
                        {edu.details.map((detail, dIdx) => (
                          <li key={dIdx} className="leading-normal">{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page 1 Footer */}
        <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3 flex justify-between font-mono">
          <span>Saika Shabir — Resume Portfolio</span>
          <span>Page 1 of 2</span>
        </div>
      </div>

      {/* PAGE 2 */}
      <div 
        id="resume-page-2" 
        className="w-[794px] h-[1122px] bg-white p-12 flex flex-col justify-between font-sans relative"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 opacity-40 rounded-br-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tr from-purple-100 to-pink-100 opacity-40 rounded-tl-full pointer-events-none"></div>

        <div>
          {/* Header Repeat */}
          <div className="border-b border-pink-100 pb-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-slate-800 leading-none">Saika Shabir</p>
              <p className="text-xs text-purple-700 font-medium">Diploma in Computer Science Engineering (CSE)</p>
            </div>
            <p className="text-[10px] font-mono text-slate-400">Saika4772@gmail.com | +91 9906385131</p>
          </div>

          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left Column (Narrow, 4/12) */}
            <div className="col-span-4 flex flex-col gap-6">
              {/* Strengths Panel */}
              <div className="bg-pink-50/50 rounded-xl p-4 border border-pink-100/40">
                <h3 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-3 font-mono">
                  Strengths
                </h3>
                <ul className="flex flex-col gap-2">
                  {resumeData.strengths.map((str, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="text-pink-500 font-bold mt-0.5">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reference details/Declaration text block */}
              <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-100/40">
                <h3 className="text-xs font-semibold text-purple-800 uppercase tracking-wider mb-2 font-mono">
                  Declaration
                </h3>
                <p className="text-[10px] text-slate-600 leading-relaxed text-justify">
                  I hereby declare that all the information provided above is true, complete, and correct to the best of my knowledge and belief.
                </p>
                <div className="mt-8 border-t border-purple-200/50 pt-2 text-right">
                  <div className="h-6"></div> {/* Spacer for signature */}
                  <span className="text-[10px] text-purple-800 font-semibold font-mono block">Saika Shabir</span>
                  <span className="text-[9px] text-slate-400 font-mono block">Signature</span>
                </div>
              </div>
            </div>

            {/* Right Column (Wide, 8/12) */}
            <div className="col-span-8 flex flex-col gap-6">
              {/* Technical Skills Section */}
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-pink-100 pb-1 mb-3 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-purple-600 rounded"></span> Technical & Soft Skills
                </h2>
                
                {/* Categorized Skills grids */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Category: Tech / Dev */}
                  <div>
                    <h3 className="text-xs font-bold text-purple-800 mb-2 font-mono border-b border-purple-50 pb-0.5">
                      Technical Skills
                    </h3>
                    <div className="flex flex-col gap-2">
                      {resumeData.skills
                        .filter(s => s.category === 'technical')
                        .map((skill, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center text-[11px] text-slate-600 mb-1">
                              <span>{skill.name}</span>
                              <span className="font-mono text-purple-700 text-[9px]">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Category: Tools */}
                  <div>
                    <h3 className="text-xs font-bold text-purple-800 mb-2 font-mono border-b border-purple-50 pb-0.5">
                      Software Tools
                    </h3>
                    <div className="flex flex-col gap-2">
                      {resumeData.skills
                        .filter(s => s.category === 'tool')
                        .map((skill, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center text-[11px] text-slate-600 mb-1">
                              <span>{skill.name}</span>
                              <span className="font-mono text-purple-700 text-[9px]">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Soft Skills badges */}
                <div className="mt-4">
                  <h3 className="text-xs font-bold text-purple-800 mb-2 font-mono border-b border-purple-50 pb-0.5">
                    Professional Qualities
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills
                      .filter(s => s.category === 'soft')
                      .map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-100 font-mono"
                        >
                          {skill.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-pink-100 pb-1 mb-3 font-mono flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-purple-600 rounded"></span> Academic Projects
                </h2>
                <div className="flex flex-col gap-4">
                  {resumeData.projects.map((proj, idx) => (
                    <div key={idx} className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xs font-semibold text-slate-800">{proj.title}</h3>
                        <div className="flex gap-1">
                          {proj.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-mono border border-slate-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-normal text-justify">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2 Footer */}
        <div className="text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3 flex justify-between font-mono">
          <span>Saika Shabir — Resume Portfolio</span>
          <span>Page 2 of 2</span>
        </div>
      </div>
    </div>
  );
};
