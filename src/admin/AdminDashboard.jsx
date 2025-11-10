import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaCode, FaProjectDiagram, FaTools, FaSearch, FaFilter, FaEnvelope } from 'react-icons/fa'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [contacts, setContacts] = useState([]);

  
  // Replace with your Google Apps Script URLs
  const API_URLS = {
    projects: 'https://script.google.com/macros/s/AKfycbzFetZamg9a8U5uS-ITwhOiabYuEkuq5GissJTXcMsevwxhYOwRCnDsG_uuLrsgkqru/exec',
    skills: 'https://script.google.com/macros/s/AKfycbzlSuUUFMhsMndp2BdN8x_4m9z2ym-u2LMofsfcM3c0D98kPxppEfCfoSn0OdxOktv6PA/exec', // Deploy skills_only.gs and paste URL here
    technologies: 'https://script.google.com/macros/s/AKfycbxOciCQmF731K-g8eNBDblAlyravEB5HFdSVeKhqqN85CDBI-27DMzbl9ewGWFoWhbZGQ/exec', // Deploy technologies_only.gs and paste URL here
    contacts: 'https://script.google.com/macros/s/AKfycbyv-i2c3o5fQ8MomRmgP8f9plMAdIjwB4NCBpWWy0griuBbWgzg6Qq54dnufH8_347rIw/exec'
  }

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    category: '',
    icon: '',
    image: '',
    github: '',
    demo: '',
    name: '',
    level: '',
    percentage: '',
    color: ''
  })

  
  // Load data on mount and tab change
  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      const url = API_URLS[activeTab]
      const response = await fetch(`${url}?action=list`)
      const data = await response.json()
      
      if (data.success) {
        if (activeTab === 'projects') setProjects(data.projects || [])
        else if (activeTab === 'skills') setSkills(data.skills || [])
        else if (activeTab === 'technologies') setTechnologies(data.technologies || [])
        else if (activeTab === 'contacts') setContacts(data.contacts || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingItem(null)
    setFormData({
      title: '', description: '', tech: '', category: '', icon: '', image: '', github: '', demo: '',
      name: '', level: '', percentage: '', color: ''
    })
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({ ...item, tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    setLoading(true)
    try {
      const url = API_URLS[activeTab]
      const response = await fetch(`${url}?action=delete`, {
        method: 'POST',
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      
      if (data.success) {
        alert('Deleted successfully!')
        loadData()
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      alert('Error deleting item: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      const url = API_URLS[activeTab]
      const action = editingItem ? 'update' : 'create'
      const payload = editingItem ? { ...formData, id: editingItem.id } : formData
      
      const response = await fetch(`${url}?action=${action}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      
      if (data.success) {
        alert(`${editingItem ? 'Updated' : 'Created'} successfully!`)
        setShowModal(false)
        loadData()
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      alert('Error saving: ' + error.message)
    } finally {
      setLoading(false)
    }
  }










  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Get current data based on active tab
  const getCurrentData = () => {
    let data = activeTab === 'projects' ? projects : 
               activeTab === 'skills' ? skills : 
               activeTab === 'technologies' ? technologies : contacts
    
    // Apply search filter
    if (searchTerm) {
      data = data.filter(item => 
        (item.title?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.subject?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.Subject?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.description?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    // Apply category filter for projects
    if (activeTab === 'projects' && filterCategory !== 'All') {
      data = data.filter(item => item.category === filterCategory)
    }
    
    return data
  }

  const getUniqueCategories = () => {
    if (activeTab !== 'projects') return []
    const categories = [...new Set(projects.map(p => p.category))].filter(Boolean)
    return ['All', ...categories.sort()]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            Admin Dashboard
          </h1>
          <p className="text-blue-200">Manage your portfolio content</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FaProjectDiagram /> Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'skills'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FaCode /> Skills
          </button>
          <button
            onClick={() => setActiveTab('technologies')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'technologies'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FaTools /> Technologies
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'contacts'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FaEnvelope /> Contacts
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-400 border rounded-lg border-white/20 bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {activeTab === 'projects' && (
            <div className="relative min-w-[150px]">
              <FaFilter className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-white border rounded-lg appearance-none border-white/20 bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {getUniqueCategories().map(cat => (
                  <option key={cat} value={cat} className="text-gray-900">{cat}</option>
                ))}
              </select>
            </div>
          )}
          
          {activeTab !== 'contacts' && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all bg-green-500 rounded-lg hover:bg-green-600 hover:scale-105"
            >
              <FaPlus /> Add New
            </button>
          )}
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white/10 backdrop-blur-lg">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    {activeTab === 'projects' && (
                      <>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Title</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Tech Stack</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Actions</th>
                      </>
                    )}
                    {activeTab === 'skills' && (
                      <>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Name</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Level</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Percentage</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Actions</th>
                      </>
                    )}
                    {activeTab === 'technologies' && (
                      <>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Name</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Icon</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Actions</th>
                      </>
                    )}
                    {activeTab === 'contacts' && (
                      <>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Name</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Email</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Subject</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Message</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-blue-200 uppercase">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {getCurrentData().map((item, index) => (
                    <tr key={item.id || index} className="transition-colors hover:bg-white/5">
                      {activeTab === 'projects' && (
                        <>
                          <td className="px-6 py-4 text-white">{item.title}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-medium text-blue-300 rounded-full bg-blue-500/20">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {Array.isArray(item.tech) ? item.tech.join(', ') : item.tech}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 transition-colors hover:text-blue-300">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 transition-colors hover:text-red-300">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === 'skills' && (
                        <>
                          <td className="px-6 py-4 text-white">{item.name}</td>
                          <td className="px-6 py-4 text-gray-300">{item.level}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 overflow-hidden bg-gray-700 rounded-full">
                                <div className="h-full bg-blue-500" style={{ width: `${item.percentage}%` }}></div>
                              </div>
                              <span className="text-sm text-gray-300">{item.percentage}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 transition-colors hover:text-blue-300">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 transition-colors hover:text-red-300">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === 'technologies' && (
                        <>
                          <td className="px-6 py-4 text-white">{item.name}</td>
                          <td className="px-6 py-4 text-gray-300">{item.category}</td>
                          <td className="px-6 py-4 text-gray-300">{item.icon}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(item)} className="p-2 text-blue-400 transition-colors hover:text-blue-300">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 transition-colors hover:text-red-300">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === 'contacts' && (
                        <>
                          <td className="px-6 py-4 text-white">{item.Name || item.name}</td>
                          <td className="px-6 py-4 text-gray-300">{item.Email || item.email}</td>
                          <td className="px-6 py-4 text-gray-300">{item.Subject || item.subject}</td>
                          <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate" title={item.Message || item.message}>
                            {item.Message || item.message}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            {item.Timestamp ? new Date(item.Timestamp).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleDelete(item.ID || item.id)} className="p-2 text-red-400 transition-colors hover:text-red-300">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {getCurrentData().length === 0 && (
                <div className="py-12 text-center text-gray-400">
                  No items found. Click "Add New" to create one.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl bg-gray-800 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold text-white">
                  {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                </h2>
                
                <div className="space-y-4">
                  {activeTab === 'projects' && (
                    <>
                      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                      <input name="tech" value={formData.tech} onChange={handleChange} placeholder="Tech Stack (comma separated)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon (e.g., FaCode)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="demo" value={formData.demo} onChange={handleChange} placeholder="Demo URL" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </>
                  )}
                  
                  {activeTab === 'skills' && (
                    <>
                      <input name="name" value={formData.name} onChange={handleChange} placeholder="Skill Name" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="level" value={formData.level} onChange={handleChange} placeholder=" (e.g., Backens, Frontend)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="percentage" type="number" min="0" max="100" value={formData.percentage} onChange={handleChange} placeholder="Percentage (0-100)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon (e.g., FaReact)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="color" value={formData.color} onChange={handleChange} placeholder="Color (e.g., #61DAFB)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </>
                  )}
                  
                  {activeTab === 'technologies' && (
                    <>
                      <input name="name" value={formData.name} onChange={handleChange} placeholder="Technology Name" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon (e.g., FaReact)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <input name="color" value={formData.color} onChange={handleChange} placeholder="Color (e.g., #61DAFB)" className="w-full px-4 py-3 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </>
                  )}
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                      <FaSave /> {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-all bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard