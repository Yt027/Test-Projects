import { History, CalendarCheck, LayoutDashboard, Menu, X, ChartNoAxesColumn, User2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Sidebar({ navigation }) {
    const [deployed, Deploy] = useState(false);
    const [view, setView] = useState('Home');

    const navigateTo = (screen) => {
        setView(screen);
        navigation.navigate(screen);
        Deploy(false);
    };

    return (
        <View style={[styles.sidebar, deployed ? styles.sidebarDeployed : {}]}>
            <Text style={styles.logo}>JDI</Text>

            <TouchableOpacity
                style={styles.switch}
                onPress={() => Deploy(!deployed)}
            >
                {deployed ? <X color="black" size={24} /> : <Menu color="black" size={24} />}
            </TouchableOpacity>

            <View style={styles.links}>
                <TouchableOpacity
                    style={[styles.item, view === "Home" ? styles.itemActive : {}]}
                    onPress={() => navigateTo("Home")}
                >
                    {deployed && <Text>Accueil</Text>}
                    <LayoutDashboard color="black" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.item, view === "Todo" ? styles.itemActive : {}]}
                    onPress={() => navigateTo("Todo")}
                >
                    {deployed && <Text>Tâches du jour</Text>}
                    <CalendarCheck color="black" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.item, view === "Historic" ? styles.itemActive : {}]}
                    onPress={() => navigateTo("Historic")}
                >
                    {deployed && <Text>Historique</Text>}
                    <History color="black" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.item, view === "Stats" ? styles.itemActive : {}]}
                    onPress={() => navigateTo("Stats")}
                >
                    {deployed && <Text>Statistiques</Text>}
                    <ChartNoAxesColumn color="black" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.item, styles.userItem, view === "User" ? styles.itemActive : {}]}
                    onPress={() => navigateTo("User")}
                >
                    {deployed && <Text>Mon compte</Text>}
                    <User2 color="black" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-end',
        padding: 8,
        paddingTop: 20,
        backgroundColor: '#f0f0f0',
        width: 60,
        transition: 'width 0.3s',
    },
    sidebarDeployed: {
        width: 200,
    },
    logo: {
        backgroundColor: '#007bff',
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'white',
        padding: 8,
        borderRadius: 8,
    },
    switch: {
        padding: 8,
    },
    links: {
        flexDirection: 'column',
        gap: 12,
        paddingTop: 48,
        height: '100%',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        borderRadius: 4,
    },
    itemActive: {
        backgroundColor: '#007bff',
    },
    userItem: {
        marginTop: 'auto',
        alignSelf: 'flex-end',
    },
});

export default Sidebar;
