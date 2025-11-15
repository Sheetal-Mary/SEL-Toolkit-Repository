import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ThumbsUp, MessageSquare, Send } from 'lucide-react';

const toolkits = [
  {
    name: "Thriving Through Play",
    implementers: ["Teachers", "Students"],
    beneficiaries: ["Early Childhood"],
    environment: ["Online", "Offline", "Hybrid"],
    adaptability: "Adaptable to Ukraine",
    composition: "Teacher capacity building and play based activities",
    focusAreas: ["Play based strategies", "Mental Wellbeing"],
    link: "https://inee.org/resources/thriving-through-play-mental-health-and-psychosocial-support-classroom-approach-educators"
  },
  {
    name: "Learning and Wellbeing in Emergencies",
    implementers: [],
    beneficiaries: ["Early Childhood"],
    environment: [],
    adaptability: "Adaptable to Ukraine",
    composition: "Teacher capacity building, activities and learner assessments",
    focusAreas: ["Reading", "Literacy", "Mental Wellbeing"],
    link: "https://inee.org/resources/learning-and-wellbeing-emergencies-resource-kit"
  },
  {
    name: "Early Adolescent Skills for Emotions (EASE)",
    implementers: [],
    beneficiaries: ["Adolescents", "Young Adults"],
    environment: ["Offline"],
    adaptability: "Adaptable to Ukraine",
    composition: "Guidebook for caregivers",
    focusAreas: ["Mental Wellbeing", "Problem Solving", "Stress Management", "Emotional Regulation"],
    link: "https://inee.org/resources/early-adolescent-skills-emotions-ease"
  },
  {
    name: "Remote Assessment Learning (ReAL)",
    implementers: ["Teachers", "Students"],
    beneficiaries: ["Early Childhood", "Middle School", "Adolescents"],
    environment: ["Online"],
    adaptability: "Adaptable to Ukraine",
    composition: "Assessment Materials",
    focusAreas: ["Math", "Literacy", "Empathy", "Stress Management", "Perseverance", "Self Awareness", "Conflict Resolution"],
    link: "https://inee.org/resources/remote-assessment-learning-real-toolkit"
  },
  {
    name: "SEL Distance Learning Activity Pack",
    implementers: ["Teachers", "Students"],
    beneficiaries: ["Early Childhood", "Middle School", "Adolescents"],
    environment: [],
    adaptability: "Adaptable to Ukraine",
    composition: "Remote Learning Materials",
    focusAreas: ["Empathy", "Resilience", "Emotional Regulation", "Decision Making", "Relationships"],
    link: "https://resourcecentre.savethechildren.net/document/social-emotional-learning-distance-learning-activity-pack"
  },
  {
    name: "UNICEF Learning Passport",
    implementers: [],
    beneficiaries: ["Early Childhood", "Middle School", "Adolescents", "Young Adults"],
    environment: [],
    adaptability: "Adaptable to Ukraine",
    composition: "Teacher and Caregiver capacity building",
    focusAreas: ["Literacy", "Emergency Preparedness", "Dealing with Loss of family member"],
    link: "https://www.unicefusa.org/what-unicef-does/childrens-education/learning-passport"
  },
  {
    name: "I Support My Friends Toolkit",
    implementers: ["Family"],
    beneficiaries: ["Middle School", "Adolescents"],
    environment: [],
    adaptability: "Adaptable to Ukraine",
    composition: "Adult facilitation manual",
    focusAreas: ["Emotional awareness", "Empathy", "Safe Space", "Active Listening"],
    link: "https://inee.org/resources"
  },
  {
    name: "Skills for Life Toolkit",
    implementers: [],
    beneficiaries: ["Early Childhood", "Middle School", "Adolescents"],
    environment: [],
    adaptability: "Universal Context",
    composition: "Teacher capacity building and learner assessments",
    focusAreas: ["Mental wellbeing", "Health", "Life Skills", "Emergency Preparedness", "Conflict Resolution", "Protection", "Safe Space"],
    link: "https://inee.org/resources"
  },
  {
    name: "Social Emotional Learning Intervention",
    implementers: [],
    beneficiaries: ["Early Childhood"],
    environment: ["Hybrid"],
    adaptability: "Universal Context",
    composition: "Teacher capacity building",
    focusAreas: ["Positive Social Skills", "Emotional Regulation", "Conflict Resolution", "Perseverance"],
    link: "https://childprotectionpractitioners.org/wp-content/uploads/2020/08/IRC_SHLS_SEL_Trainers_Manual_08.2016_WEB.pdf"
  },
  {
    name: "Families Make a Difference",
    implementers: ["Community"],
    beneficiaries: ["Early Childhood", "Middle School", "Adolescents"],
    environment: ["Offline"],
    adaptability: "Universal Context",
    composition: "Caregiver curriculum for child development",
    focusAreas: ["Parent child relationships", "Responsive caregiving in emergencies"],
    link: "https://inee.org/resources"
  },
  {
    name: "Step by Step Toolkit",
    implementers: [],
    beneficiaries: ["Early Childhood", "Middle School", "Adolescents"],
    environment: ["Offline"],
    adaptability: "Universal Context",
    composition: "Teacher Capacity Building and Learner Materials",
    focusAreas: ["Positive Social Skills", "Self Awareness", "Self Regulation", "Communication", "Determination", "Decision Making"],
    link: "https://www.mhpss.net/toolkit/mhpss-and-eie/resource/step-by-step-toolkit-promoting-social-and-emotional-learning-sel-in-children-and-teens"
  }
];

const SELDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [selectedImplementers, setSelectedImplementers] = useState([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState([]);
  const [selectedAdaptability, setSelectedAdaptability] = useState([]);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [upvotes, setUpvotes] = useState({
    "Thriving Through Play": 34,
    "Remote Assessment Learning (ReAL)": 28,
    "SEL Distance Learning Activity Pack": 42,
    "Skills for Life Toolkit": 51,
    "Step by Step Toolkit": 37
  });
  const [comments, setComments] = useState({
    "Thriving Through Play": [
      {
        text: "We implemented this in our kindergarten classroom in Kyiv. The play-based activities helped children express their emotions after displacement. Highly recommend the puppet theater activity!",
        timestamp: "2024-10-15T10:30:00Z",
        id: 1001
      },
      {
        text: "Used this toolkit with 5-6 year olds in a temporary learning center. The structured play sessions gave children a sense of normalcy and routine. Parents noticed reduced anxiety.",
        timestamp: "2024-10-22T14:20:00Z",
        id: 1002
      },
      {
        text: "Adapted the activities for online sessions during power outages. The simple materials requirement made it feasible even with limited resources.",
        timestamp: "2024-11-01T09:15:00Z",
        id: 1003
      }
    ],
    "Remote Assessment Learning (ReAL)": [
      {
        text: "Perfect for tracking both academic and SEL progress remotely. The assessment rubrics are clear and the students enjoyed the interactive components.",
        timestamp: "2024-10-18T11:45:00Z",
        id: 2001
      },
      {
        text: "We used this across grades 1-6 in our online learning program. The literacy and math assessments paired beautifully with the empathy and stress management modules.",
        timestamp: "2024-10-25T16:30:00Z",
        id: 2002
      }
    ],
    "SEL Distance Learning Activity Pack": [
      {
        text: "Essential resource during remote learning! The activities are age-appropriate and easy to facilitate via video call. Our middle schoolers particularly loved the resilience-building exercises.",
        timestamp: "2024-10-12T13:20:00Z",
        id: 3001
      },
      {
        text: "Translated some activities to Ukrainian and used them in our community center. The relationship-building activities helped children reconnect after months apart.",
        timestamp: "2024-10-28T10:00:00Z",
        id: 3002
      },
      {
        text: "Great for mixed-age groups. We adapted it for siblings learning together at home. The emotional regulation activities were particularly helpful during stressful times.",
        timestamp: "2024-11-03T15:45:00Z",
        id: 3003
      }
    ],
    "Skills for Life Toolkit": [
      {
        text: "Comprehensive and well-structured! We've been using this in our emergency education program for 6 months. The conflict resolution section is invaluable in our context.",
        timestamp: "2024-09-20T09:30:00Z",
        id: 4001
      },
      {
        text: "The teacher capacity building component was excellent. Helped our team feel more confident addressing children's wellbeing alongside academic learning.",
        timestamp: "2024-10-05T14:15:00Z",
        id: 4002
      },
      {
        text: "Used this with early childhood through adolescent groups. The safe space creation guidelines helped establish trust quickly with displaced children.",
        timestamp: "2024-10-30T11:20:00Z",
        id: 4003
      },
      {
        text: "The emergency preparedness activities gave children practical coping skills. Assessments help us track progress and identify who needs additional support.",
        timestamp: "2024-11-05T08:50:00Z",
        id: 4004
      }
    ],
    "Step by Step Toolkit": [
      {
        text: "Excellent for building foundational SEL skills. The self-regulation activities have been transformative for our younger students who experienced trauma.",
        timestamp: "2024-10-10T12:00:00Z",
        id: 5001
      },
      {
        text: "We integrated this into our regular curriculum. The communication and determination modules align perfectly with our holistic education approach.",
        timestamp: "2024-10-24T16:45:00Z",
        id: 5002
      },
      {
        text: "The learner materials are engaging and the teacher capacity building sessions prepared us well. Highly recommend for anyone working with children in crisis contexts.",
        timestamp: "2024-11-02T10:30:00Z",
        id: 5003
      }
    ]
  });
  const [newComment, setNewComment] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const allBeneficiaries = [...new Set(toolkits.flatMap(t => t.beneficiaries))].sort();
  const allImplementers = [...new Set(toolkits.flatMap(t => t.implementers))].sort();
  const allEnvironments = [...new Set(toolkits.flatMap(t => t.environment))].sort();
  const allAdaptability = [...new Set(toolkits.map(t => t.adaptability))].sort();
  const allFocusAreas = [...new Set(toolkits.flatMap(t => t.focusAreas))].sort();

  const filteredToolkits = useMemo(() => {
    return toolkits.filter(toolkit => {
      const matchesSearch = toolkit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          toolkit.composition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          toolkit.focusAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBeneficiaries = selectedBeneficiaries.length === 0 || 
                                   selectedBeneficiaries.some(b => toolkit.beneficiaries.includes(b));
      
      const matchesImplementers = selectedImplementers.length === 0 || 
                                  selectedImplementers.some(i => toolkit.implementers.includes(i));
      
      const matchesEnvironment = selectedEnvironment.length === 0 || 
                                selectedEnvironment.some(e => toolkit.environment.includes(e));
      
      const matchesAdaptability = selectedAdaptability.length === 0 || 
                                 selectedAdaptability.includes(toolkit.adaptability);
      
      const matchesFocusAreas = selectedFocusAreas.length === 0 || 
                               selectedFocusAreas.some(f => toolkit.focusAreas.includes(f));

      return matchesSearch && matchesBeneficiaries && matchesImplementers && 
             matchesEnvironment && matchesAdaptability && matchesFocusAreas;
    });
  }, [searchTerm, selectedBeneficiaries, selectedImplementers, selectedEnvironment, selectedAdaptability, selectedFocusAreas]);

  const toggleFilter = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBeneficiaries([]);
    setSelectedImplementers([]);
    setSelectedEnvironment([]);
    setSelectedAdaptability([]);
    setSelectedFocusAreas([]);
  };

  const handleUpvote = (toolkitName) => {
    setUpvotes(prev => ({
      ...prev,
      [toolkitName]: (prev[toolkitName] || 0) + 1
    }));
  };

  const handleAddComment = (toolkitName) => {
    if (newComment[toolkitName]?.trim()) {
      setComments(prev => ({
        ...prev,
        [toolkitName]: [
          ...(prev[toolkitName] || []),
          {
            text: newComment[toolkitName],
            timestamp: new Date().toISOString(),
            id: Date.now()
          }
        ]
      }));
      setNewComment(prev => ({ ...prev, [toolkitName]: '' }));
    }
  };

  const toggleComments = (toolkitName) => {
    setExpandedComments(prev => ({
      ...prev,
      [toolkitName]: !prev[toolkitName]
    }));
  };

  const activeFilterCount = selectedBeneficiaries.length + selectedImplementers.length + 
                           selectedEnvironment.length + selectedAdaptability.length + 
                           selectedFocusAreas.length;

  const FilterSection = ({ title, options, selected, setSelected }) => (
    <div className="mb-4">
      <h3 className="font-semibold text-sm text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => toggleFilter(option, selected, setSelected)}
            className={`px-3 py-1 rounded-full text-xs transition-colors ${
              selected.includes(option)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessible SEL Toolkits for Reparative Education during Crisis</h1>
          <p className="text-gray-600">Explore 11 Social Emotional Learning toolkits and find the perfect fit for your context</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search toolkits by name, focus area, or composition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <FilterSection 
                title="Beneficiaries" 
                options={allBeneficiaries} 
                selected={selectedBeneficiaries} 
                setSelected={setSelectedBeneficiaries} 
              />
              <FilterSection 
                title="Implementers" 
                options={allImplementers} 
                selected={selectedImplementers} 
                setSelected={setSelectedImplementers} 
              />
              <FilterSection 
                title="Environment" 
                options={allEnvironments} 
                selected={selectedEnvironment} 
                setSelected={setSelectedEnvironment} 
              />
              <FilterSection 
                title="Adaptability" 
                options={allAdaptability} 
                selected={selectedAdaptability} 
                setSelected={setSelectedAdaptability} 
              />
              <FilterSection 
                title="Focus Areas" 
                options={allFocusAreas} 
                selected={selectedFocusAreas} 
                setSelected={setSelectedFocusAreas} 
              />
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredToolkits.length}</span> of <span className="font-semibold">{toolkits.length}</span> toolkits
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToolkits.map((toolkit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 flex-1">{toolkit.name}</h3>
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => handleUpvote(toolkit.name)}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span className="text-xs font-semibold">{upvotes[toolkit.name] || 0}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(toolkit.name)}
                    className="flex items-center gap-1 bg-gray-50 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span className="text-xs font-semibold">{comments[toolkit.name]?.length || 0}</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                {toolkit.beneficiaries.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Beneficiaries:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {toolkit.beneficiaries.map((b, i) => (
                        <span key={i} className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {toolkit.implementers.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Implementers:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {toolkit.implementers.map((i, idx) => (
                        <span key={idx} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {toolkit.environment.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-700">Environment:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {toolkit.environment.map((e, i) => (
                        <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-gray-700">Adaptability:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    toolkit.adaptability === 'Adaptable to Ukraine' 
                      ? 'bg-orange-100 text-orange-700' 
                      : 'bg-teal-100 text-teal-700'
                  }`}>
                    {toolkit.adaptability}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Toolkit Composition:</span>
                  <p className="text-gray-600 mt-1">{toolkit.composition}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Focus Areas:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {toolkit.focusAreas.map((area, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={toolkit.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
              >
                Access Toolkit
              </a>

              {expandedComments[toolkit.name] && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Community Feedback</h4>
                  
                  {comments[toolkit.name] && comments[toolkit.name].length > 0 && (
                    <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                      {comments[toolkit.name].map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-3 rounded text-sm">
                          <p className="text-gray-700">{comment.text}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Share how you used this toolkit..."
                      value={newComment[toolkit.name] || ''}
                      onChange={(e) => setNewComment(prev => ({
                        ...prev,
                        [toolkit.name]: e.target.value
                      }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(toolkit.name);
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleAddComment(toolkit.name)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredToolkits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No toolkits match your current filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SELDashboard;