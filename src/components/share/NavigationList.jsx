'use client'
import { MODAL_NAVIGATION_ITEMS } from '../../config/navigation'

export default function NavigationList({ theme }) {
    const handleNavigate = (link) => {
        window.location.href = link
    }

    return (
        <div className="space-y-4">
            {MODAL_NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                    <div
                        key={item.id}
                        onClick={() => handleNavigate(item.link)}
                        className={`
                            p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                            hover:scale-[1.02] hover:shadow-lg group
                            ${theme === 'dark' 
                                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                            }
                        `}
                    >
                        <div className="flex items-center gap-4">
                            {/* Icon với style giống dock */}
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center
                                transition-all duration-300 shadow-lg
                                ${item.bg}
                                group-hover:scale-110
                            `}>
                                <Icon className={`text-xl ${item.color}`} />
                            </div>
                            
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                                    {item.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                            
                            <div className={`
                                text-lg font-medium transition-all duration-300
                                text-gray-600 dark:text-gray-400 
                                group-hover:text-gray-900 dark:group-hover:text-white
                            `}>
                                →
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
