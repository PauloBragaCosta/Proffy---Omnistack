import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../api';


import './styles.css';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function createNewConnection() {
        api.post('conecctions',{
            user_id: teacher.id,
        })
    }

    return (
        <article className="teacher-item">
            <article className="teacher-item">
                <header>
                    <img src={teacher.avatar} alt={teacher.name} />
                    <div>
                        <strong>{teacher.name}</strong>
                        <span>{teacher.subject}</span>
                    </div>
                </header>

                <p>{teacher.bio}</p>

                <footer>
                    <p>
                        Preço/hora
                                <strong>{teacher.cost}</strong>
                    </p>
                    <button type="button">
                        <a target="blank" onClick={createNewConnection} href={`https://wa.me/${teacher.whatsapp}`}>
                        <img src={whatsappIcon} alt="whatsapp" />
                                Entrar em contato
                        </a>
                            </button>
                </footer>
            </article>

        </article>

    );
}

export default TeacherItem;
