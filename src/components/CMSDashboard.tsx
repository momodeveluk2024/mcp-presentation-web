import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  status: 'draft' | 'published' | 'updating'
  author: string
  date: string
}

interface CMSDashboardProps {
  actions?: ('create' | 'update' | 'delete' | 'publish')[]
  autoPlay?: boolean
}

export function CMSDashboard({ actions = ['create'], autoPlay = true }: CMSDashboardProps) {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: 'Welcome to Our Blog', status: 'published', author: 'Admin', date: 'Jan 15' },
    { id: 2, title: 'Getting Started Guide', status: 'published', author: 'Admin', date: 'Jan 12' },
  ])
  const [notification, setNotification] = useState('')
  const [actionIndex, setActionIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || actionIndex >= actions.length) return

    const timer = setTimeout(() => {
      const action = actions[actionIndex]

      if (action === 'create') {
        setNotification('Creating new post via MCP...')
        setTimeout(() => {
          setPosts(prev => [{
            id: Date.now(),
            title: 'New Post from AI',
            status: 'draft',
            author: 'AI Assistant',
            date: 'Just now'
          }, ...prev])
          setNotification('Post created successfully!')
          setTimeout(() => setNotification(''), 2000)
          setActionIndex(prev => prev + 1)
        }, 1500)
      } else if (action === 'publish') {
        setNotification('Publishing draft posts...')
        setTimeout(() => {
          setPosts(prev => prev.map(p => 
            p.status === 'draft' ? { ...p, status: 'published' as const } : p
          ))
          setNotification('All posts published!')
          setTimeout(() => setNotification(''), 2000)
          setActionIndex(prev => prev + 1)
        }, 1500)
      } else if (action === 'update') {
        setNotification('Updating post content...')
        setTimeout(() => {
          setPosts(prev => prev.map((p, i) => 
            i === 0 ? { ...p, title: 'Updated: ' + p.title, status: 'updating' as const } : p
          ))
          setTimeout(() => {
            setPosts(prev => prev.map((p, i) => 
              i === 0 ? { ...p, status: 'published' as const } : p
            ))
            setNotification('Post updated!')
            setTimeout(() => setNotification(''), 2000)
            setActionIndex(prev => prev + 1)
          }, 1000)
        }, 1500)
      } else if (action === 'delete') {
        setNotification('Moving post to trash...')
        setTimeout(() => {
          setPosts(prev => prev.slice(1))
          setNotification('Post deleted')
          setTimeout(() => setNotification(''), 2000)
          setActionIndex(prev => prev + 1)
        }, 1500)
      }
    }, actionIndex === 0 ? 1000 : 3000)

    return () => clearTimeout(timer)
  }, [actionIndex, actions, autoPlay])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: 700,
        overflow: 'hidden',
      }}
    >
      {/* CMS Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ color: 'white', fontWeight: 600, fontSize: 18 }}>Content Manager</span>
        </div>
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '6px 14px', 
          borderRadius: 20,
          color: 'white',
          fontSize: 13,
        }}>
          MCP Connected
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: notification.includes('success') || notification.includes('published') || notification.includes('updated')
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '12px 24px',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: notification.includes('...') ? Infinity : 0 }}
              style={{ width: 16, height: 16 }}
            >
              {notification.includes('...') ? '⏳' : '✓'}
            </motion.div>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts list */}
      <div style={{ padding: 24 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 20 
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b' }}>Recent Posts</h3>
          <span style={{ fontSize: 13, color: '#64748b' }}>{posts.length} posts</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{
                  background: '#f8fafc',
                  borderRadius: 12,
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: post.status === 'updating' ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, color: '#1e293b', marginBottom: 4 }}>
                    {post.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>
                    {post.author} • {post.date}
                  </div>
                </div>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  background: post.status === 'published' ? '#dcfce7' : 
                              post.status === 'updating' ? '#dbeafe' : '#fef3c7',
                  color: post.status === 'published' ? '#16a34a' : 
                         post.status === 'updating' ? '#1d4ed8' : '#d97706',
                }}>
                  {post.status === 'updating' ? 'Updating...' : post.status}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
