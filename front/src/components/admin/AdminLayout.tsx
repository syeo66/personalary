import 'dracula-ui/styles/dracula-ui.css'

import React, { PropsWithChildren } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <AdminPage>
    <AdminHeader className="drac-bg-yellow-pink">
      <HeaderLink to="/admin">Personalary Admin</HeaderLink>
    </AdminHeader>

    <AdminSidebar className="drac-text-orange">
      <StyledNavLink className="drac-text-orange" to="clock">
        Clock
      </StyledNavLink>
      <StyledNavLink className="drac-text-orange" to="background">
        Background
      </StyledNavLink>
      <StyledNavLink className="drac-text-orange" to="messages">
        Messages
      </StyledNavLink>
      <StyledNavLink className="drac-text-orange" to="musicplayer">
        Music Player
      </StyledNavLink>
    </AdminSidebar>

    <AdminContent>{children}</AdminContent>
  </AdminPage>
)

const HeaderLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const StyledNavLink = styled(NavLink)`
  font-weight: bold;
  text-decoration: none;
  margin-right: 0.5rem;

  &.active {
    color: var(--pink);
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
    line-height: 2.25rem;
    display: block;
  }
`

const AdminPage = styled.div`
  & > * {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: clamp(200px, 25%, 350px) 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'header header'
      'sidebar content';
  }

  min-height: 100vh;
  background-color: #333;
  color: #fff;

  & a {
    color: var(--orange);
    text-decoration: none;
  }
`

const AdminHeader = styled.header`
  font-size: 1.75rem;
  font-weight: bold;
  grid-area: header;

  & a {
    color: #333;
  }
`

const AdminSidebar = styled.nav`
  @media (min-width: 768px) {
    grid-area: sidebar;
  }
  background-color: #222;
`

const AdminContent = styled.main`
  grid-area: content;
  & > *:first-child {
    margin-top: 0;
  }
`

export default AdminLayout
