import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <AdminPage>
    <AdminHeader>
      <HeaderLink to="/admin">Personalary Admin</HeaderLink>
    </AdminHeader>

    <AdminSidebar>
      <NavLink to="clock">Clock</NavLink>
      <NavLink to="background">Background</NavLink>
      <NavLink to="messages">Messages</NavLink>
      <NavLink to="musicplayer">Music Player</NavLink>
    </AdminSidebar>

    <AdminContent>{children}</AdminContent>
  </AdminPage>
)

const HeaderLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const NavLink = styled(Link)`
  color: rgb(16, 16, 214);
  font-weight: bold;
  text-decoration: none;
  margin-right: 0.5rem;

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
    height: 100vh;
  }
`

const AdminHeader = styled.header`
  background: rgb(0, 5, 36);
  background: linear-gradient(34deg, rgba(0, 5, 36, 1) 0%, rgba(16, 16, 214, 1) 35%, rgba(0, 212, 255, 1) 100%);
  border-bottom: rgba(16, 16, 214, 0.5) solid 1px;
  box-shadow: 0 0 20px rgba(16, 16, 214, 0.5), 0 0 10px rgba(16, 16, 214, 0.4);
  color: rgba(0, 212, 255, 1);
  font-size: 1.75rem;
  font-weight: bold;
  grid-area: header;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5), 1px 1px 0px rgba(0, 0, 0, 0.9), -1px -1px 0px rgba(0, 0, 0, 0.9);
`

const AdminSidebar = styled.nav`
  @media (min-width: 768px) {
    grid-area: sidebar;
    box-shadow: 0 0 20px rgba(16, 16, 214, 0.4);
    border-right: rgba(0, 0, 0, 0.3) solid 1px;
  }
`

const AdminContent = styled.main`
  grid-area: content;
  & > *:first-child {
    margin-top: 0;
  }
`

export default AdminLayout
