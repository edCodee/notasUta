import React from 'react';
import headerImg from '../assets/images/main.png';

const NotasUtaExacta = () => {
    const styles = {
        wrapper: {
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        overflowX: 'hidden'
        },
        mainContainer: {
        paddingRight: '15px',
        paddingLeft: '15px',
        maxWidth: '1170px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
        },
        headerImageParams: {
        width: '100%',
        height: 'auto',
        display: 'block',
        },
        navBar: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '15px 0',
        marginBottom: '10px',
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#333'
        },
        navLink: {
        textDecoration: 'none',
        color: 'black',
        padding: '0 10px',
        borderRight: '1px solid #ccc',
        lineHeight: '1'
        },
        navLinkLast: {
        textDecoration: 'none',
        color: 'black',
        padding: '0 10px',
        borderRight: 'none'
        },
        pageTitle: {
        textAlign: 'center',
        fontSize: '28px',
        color: '#333',
        fontWeight: '500',
        margin: '20px 0 30px 0'
        },
        tableContainer: {
        width: '100%',
        marginBottom: '40px'
        },
        table: {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ddd'
        },
        th: {
        padding: '8px',
        textAlign: 'left',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        whiteSpace: 'nowrap' 
        },
        redRow: {
        backgroundColor: '#781b11',
        color: 'white',
        fontWeight: 'bold',
        padding: '8px',
        border: '1px solid #781b11'
        },
        // Celdas normales
        td: {
        padding: '8px',
        border: '1px solid #ddd',
        verticalAlign: 'middle',
        fontSize: '14px',
        color: '#333'
        },
    footerBox: {
        backgroundColor: '#404041', 
        color: 'white',
        padding: '2px 15px', 
        textAlign: 'center',
        fontSize: '13px',
        width: '100%',
        marginTop: 'auto', 
        marginBottom: '15px'
    }
    };

    return (
        <div style={styles.wrapper}>
        
        <div style={styles.mainContainer}>
            
            <div>
                <img 
                    src={headerImg} 
                    alt="Header UTA" 
                    style={styles.headerImageParams} 
                />
            </div>

            <div style={styles.navBar}>
                <a href="#" style={styles.navLink}>Notas Actuales</a>
                <a href="#" style={styles.navLink}>Cultura Física<br/>Anterior</a>
                <a href="#" style={styles.navLink}>Idiomas Regular<br/>Anterior</a>
                <a href="#" style={styles.navLink}>Idiomas Abierto<br/>Anterior</a>
                <a href="#" style={styles.navLink}>Examen<br/>Suficiencia<br/>Institucional</a>
                <a href="#" style={styles.navLinkLast}>Logout</a>
            </div>

            {/* 3. TÍTULO */}
            <h2 style={styles.pageTitle}>Calificaciones Actuales</h2>

            {/* 4. TABLA */}
            <div style={styles.tableContainer}>
            <table style={styles.table}>
                <thead>
                <tr>
                    <th style={styles.th}>Curso</th>
                    <th style={styles.th}>Materia</th>
                    {/* Aumentamos ancho a 80px para evitar el salto de línea en "Asist. 1" */}
                    <th style={{ ...styles.th, width: '80px' }}>Nota 1</th>
                    <th style={{ ...styles.th, width: '80px' }}>Asist. 1</th>
                    <th style={styles.th}>Nota 2</th>
                    <th style={styles.th}>Asist. 2</th>
                    <th style={styles.th}>Supl.</th>
                    <th style={styles.th}>Observación</th>
                </tr>
                {/* Fila Roja */}
                <tr>
                    <td colSpan="8" style={styles.redRow}>
                    Carrera/Centro : Mecánica
                    </td>
                </tr>
                </thead>
                <tbody>
                {/* FILA 1 */}
                <tr>
                    <td style={styles.td}>SEGUNDO B</td>
                    <td style={styles.td}>DIBUJO TÉCNICO Y CAD</td>
                    <td style={styles.td}>7.8</td>
                    <td style={styles.td}>80</td>
                    <td style={styles.td}>8.1</td>
                    <td style={styles.td}>89</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Aprobado</td>
                </tr>
                {/* FILA 2 */}
                <tr>
                    <td style={styles.td}>TERCERO A</td>
                    <td style={styles.td}>DINAMICA</td>
                    <td style={styles.td}>5.9</td>
                    <td style={styles.td}>100</td>
                    <td style={styles.td}>8.2</td>
                    <td style={styles.td}>100</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Aprobado</td>
                </tr>
                {/* FILA 3 */}
                <tr>
                    <td style={styles.td}>TERCERO A</td>
                    <td style={styles.td}>RESISTENCIA DE MATERIALES l</td>
                    <td style={styles.td}>6.8</td>
                    <td style={styles.td}>88</td>
                    <td style={styles.td}>7.3</td>
                    <td style={styles.td}>86</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Aprobado</td>
                </tr>
                {/* FILA 4 */}
                <tr>
                    <td style={styles.td}>TERCERO A</td>
                    <td style={styles.td}>INGENIERÍA DE MATERIALES l</td>
                    <td style={styles.td}>8.6</td>
                    <td style={styles.td}>100</td>
                    <td style={styles.td}>8.7</td>
                    <td style={styles.td}>82</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Aprobado</td>
                </tr>
                {/* FILA 5 */}
                <tr>
                    <td style={styles.td}>TERCERO A</td>
                    <td style={styles.td}>MECÁNICA DE FLUIDOS l</td>
                    <td style={styles.td}>7.3</td>
                    <td style={styles.td}>71</td>
                    <td style={styles.td}>9</td>
                    <td style={styles.td}>85</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Aprobado</td>
                </tr>
                {/* FILA 6 */}
                <tr>
                    <td style={styles.td}>TERCERO A</td>
                    <td style={styles.td}>REALIDAD NACIONAL</td>
                    <td style={styles.td}>8.3</td>
                    <td style={styles.td}>100</td>
                    <td style={styles.td}>7.9</td>
                    <td style={styles.td}>94</td>
                    <td style={styles.td}></td>
                    <td style={styles.td}>Aprobado</td>
                </tr>
                </tbody>
            </table>
            </div>

            {/* 5. FOOTER (Dentro de la caja y más delgado) */}
            <div style={styles.footerBox}>
                © 2025 - Sistema Integrado
            </div>

        </div>
        </div>
    );
};

export default NotasUtaExacta;