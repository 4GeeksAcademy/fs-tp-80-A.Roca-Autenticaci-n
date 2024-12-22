const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
	
		},
		actions: {
			register: async (formData) => {
				try {
				const resp = await fetch('https://congenial-bassoon-9w9p77xrxxphxv4p-3001.app.github.dev/api/register' , {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
				if (!resp.ok) throw new Error("Algo ha ido mal!")
					const data = await resp.json()
					localStorage.setItem('token', data.token)
					console.log(data)
					return  true
			} catch (error) {
				console.log(error)
				return false
			}
			},

			login: async (formData) => {
				try {
				const resp = await fetch('https://congenial-bassoon-9w9p77xrxxphxv4p-3001.app.github.dev/api/login' , {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
				if (!resp.ok) throw new Error("Algo ha ido mal!")
					const data = await resp.json()
					localStorage.setItem('token', data.token)
					console.log(data)
					return  true
			} catch (error) {
				console.log(error)
				return false
			}
			},

			checkUser: async () => {
				try {
					const resp = await fetch('https://congenial-bassoon-9w9p77xrxxphxv4p-3001.app.github.dev/api/protected', {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					})
					if (!resp.ok) throw new Error('Algo ha ido mal')
						const data = await resp.json();
						setStore({user: data.user})
						console.log(data)
						return true
				} catch (error) {
					console.error(error)
					return false
				}
			}
		}
	};
};

export default getState;
