import s from './findFriends.module.css'
import React from 'react'
import User from './user'
import LoaderLamp from '../../../UI/loaderLamp'

class FindFriends extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.pageSize)
	}

	showUsers = page => {
		this.props.setSelectPage(page)
		this.props.getUsers(this.props.pageSize, page)
	}
	render() {
		const selectPage = Math.ceil(
			this.props.totalUsersCount / this.props.pageSize
		)

		let allPages = []

		for (let i = 1; i <= selectPage; i++) {
			allPages.push(i)
		}

		return (
			<div>
				<div className={s.body}>
					<div className={s.navPages}>
						{allPages.map(page => {
							return (
								<span
									key={page}
									className={`${
										this.props.selectPage === page ? s.select : ''
									} ${s.navPage}`}
									onClick={() => {
										this.showUsers(page)
									}}
								>
									{page}
								</span>
							)
						})}
					</div>
					{this.props.downloadStatus ? (
						<div className={s.loaderDiv}>
							<LoaderLamp />
						</div>
					) : null}
					<nav className={s.nav}>
						<ul className={s.ul}>
							{this.props.state.map(user => {
								return (
									<User
										setUserPageState={this.props.setUserPageState}
										key={Math.random()}
										user={user}
										state={this.props.state}
										unfollow={this.props.unfollow}
										follow={this.props.follow}
									></User>
								)
							})}
						</ul>
					</nav>
				</div>
			</div>
		)
	}
}

export default FindFriends
